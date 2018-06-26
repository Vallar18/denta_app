;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', 'userSvc', 'fcmSvc', 'regSvc', 'authSvc', 'toastr', 'messagesSvc', 'codes', 'phoneSvc'];

    function AddPhoneCtrl($scope, $state, userSvc, fcmSvc, regSvc, authSvc, toastr, messagesSvc, codes, phoneSvc) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.codes = codes;
        let selectedCountry = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = selectedCountry.code;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send'
        };

        // vm.test = function () {
        //     $ionicPopup.show({
        //         templateUrl: 'components/select-subscription/select-subscription.html',
        //         cssClass: 'select-subscription',
        //         title: '',
        //         scope: $scope,
        //         buttons: [
        //             {text: 'Cancel'},
        //             {
        //                 text: '<b>OK</b>',
        //                 type: 'button-positive',
        //                 onTap: function (e) {
        //                 }
        //             }
        //         ]
        //     });
        // };

        function send() {
            authSvc.setCountryId(selectedCountry.id);
            let phone = phoneSvc.preparePhone(vm.select_code, vm.phone);
            if (!phoneSvc.validatePhone(phone)) {
                toastr.error(messagesSvc.error.invalidPhone);
                return;
            }
            regSvc.sendPhone({
                phone: phone
            }).then(function (res) {
                if (res.success && res.data) {
                    console.log(res.data);
                    toastr.success(res.data, null, {
                        timeOut: 20000,
                        tapToDismiss: true
                    });
                    userSvc.setShowStart(false);
                    authSvc.setPhone(phone);
                    vm.phone = '';
                    $state.go('add-code');
                } else if (res.message) {
                    toastr.error(res.message);
                }
            });
        }

        function getSelectCode() {
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            selectedCountry = code;
            vm.codePopup.close();
        }
    }

})();
