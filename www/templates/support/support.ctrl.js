;(function () {
    'use strict';

    angular
        .module('app')
        .controller('SupportCtrl', SupportCtrl);

    SupportCtrl.$inject = ['$ionicHistory', 'userSvc', 'toastr', 'messagesSvc', 'questionSvc'];

    function SupportCtrl($ionicHistory, userSvc, toastr, messagesSvc, questionSvc) {
        const vm = this;
        init();

        function init() {
            vm.user = userSvc.getUser();
            vm.message = '';
        }

        vm.send = () => {
            if (validation()) {
                let data = {
                    description: vm.message,
                    email: vm.user.email
                };
                questionSvc.create(data).then(function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        vm.message = '';
                    } else {
                        toastr.error(data.message);
                    }
                });
            }
        };

        function validation() {
            if (vm.user.email === undefined) {
                toastr.error(messagesSvc.error.invalidEmail);
                return false
            }
            if (vm.message === '') {
                toastr.error(messagesSvc.error.emptyField);
                return false;
            }
            return true;
        }

        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();