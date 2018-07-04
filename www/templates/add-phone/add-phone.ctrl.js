;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', 'userSvc', 'authSvc', 'regSvc', 'toastr', 'messagesSvc', 'codes', 'phoneSvc'];

    function AddPhoneCtrl($scope, $state, userSvc, authSvc, regSvc, toastr, messagesSvc, codes, phoneSvc) {
        var vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        authSvc.logout();
        vm.codes = codes;
        var selected_country = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = selected_country.code;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send'
        };

        // if (authSvc.isLogined()) {
        //     authSvc.processAutoLogin();
        // }

        function send() {
            authSvc.setCountryId(selected_country.id);
            var phone = phoneSvc.preparePhone(vm.select_code, vm.phone);
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
            selected_country = code;
            vm.codePopup.close();
        }
    }

})();
