;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', 'userSvc', 'authSvc', 'regSvc', 'toastr', 'messagesSvc', 'codes', 'phoneSvc', '$stateParams'];

    function AddPhoneCtrl($scope, $state, userSvc, authSvc, regSvc, toastr, messagesSvc, codes, phoneSvc, $stateParams) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        getLoc();
        authSvc.clearAuthData();
        userSvc.resetData();
        vm.codes = codes;
        vm.phone = $stateParams.phone || '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send'
        };

        // if (authSvc.isLogined()) {
        //     authSvc.processAutoLogin();
        // }
        function getLoc() {
            $.getJSON("http://ip-api.com/json/?callback=?", function (data) {
                phoneSvc.setDefaultCountry(data.country);
                vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
                vm.select_code = vm.selected_country.code;
            });
        }

        function send() {
            authSvc.setCountryId(vm.selected_country.id);
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
                    authSvc.setPhone(phone);
                    $state.go('add-code', {phone: vm.phone});
                    vm.phone = '';
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
            vm.selected_country = code;
            vm.codePopup.close();
        }
    }

})();
