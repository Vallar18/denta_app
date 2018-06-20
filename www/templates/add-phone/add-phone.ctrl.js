;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', '$localStorage', 'regSvc', 'authSvc', 'toastr', 'messagesSvc', '$ionicPopup', 'codes', 'phoneSvc'];

    function AddPhoneCtrl($scope, $state, $localStorage, regSvc, authSvc, toastr, messagesSvc, $ionicPopup, codes, phoneSvc) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.codes = codes;
        var selectedCountry = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = selectedCountry.code;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send'
        };


        vm.test = function () {
            $ionicPopup.show({
                templateUrl: 'components/select-subscription/select-subscription.html',
                cssClass: 'select-subscription',
                title: '',
                scope: $scope,
                buttons: [
                    {text: 'Cancel'},
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                        }
                    }
                ]
            });
        };

        function send() {
            authSvc.setCountryId(selectedCountry.id);
            if (!validPhone()) {
                toastr.error(messagesSvc.error.invalidPhone);
            }
            let send = {
                phone: vm.sum_phone
            };
            regSvc.sendPhone(send).then(function (data) {
                if (data.success) {
                    console.log(data.data);
                    toastr.success(data.data, null, {
                        timeOut: 20000,
                        tapToDismiss: true
                    });
                    $state.go('add-code');
                    $localStorage.valView = false;
                    authSvc.setPhone(vm.sum_phone);
                    vm.phone = '';
                } else {
                    if (data.message) {
                        toastr.error(data.message);
                    }
                }
            });
        }

        function validPhone() {
            if (vm.phone !== '') {
                vm.sum_phone = vm.select_code + vm.phone;
                vm.len_phone = vm.sum_phone.toString().length;
                if (vm.len_phone > 8 && vm.len_phone < 20) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function getSelectCode() {
            $scope.data = {};
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            selectedCountry = code;
            vm.codePopup.close();
        }
    }

})
();
