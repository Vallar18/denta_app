;(function () {
    'use strict';

    angular
        .module('app')
        .controller('SupportCtrl', SupportCtrl);

    SupportCtrl.$inject = ['$ionicHistory', 'userSvc', 'toastr', 'messagesSvc'];

    function SupportCtrl($ionicHistory, userSvc, toastr, messagesSvc) {
        const vm = this;
        init();

        function init() {
           vm.user = userSvc.getUser();
           vm.message = '';
        }

        vm.send = () => {
            if(validation()){
                let data = {
                    message: vm.message,
                    email: vm.user.email
                };
                console.log('Send message --- ',  data);
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