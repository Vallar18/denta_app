;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state'];

    function LoginCtrl($state) {
        var vm = this;

        vm.sendLogin = sendLogin;

        vm.user = {
            phone: '',
            password: ''
        };

        function sendLogin(user) {
        }
    }
})();