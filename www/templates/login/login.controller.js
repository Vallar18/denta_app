;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state'];

    function LoginController($state) {
        var vm = this;

        vm.sendLogin = sendLogin;

        vm.user = {
            phone: '',
            password: ''
        };

        function sendLogin(user) {
            $state.go('tabs.homepage');
            // authorizationServices.checkLogin(vm.user)
            //     .then(function (LoginRespons) {
            //         $localStorage.auth_key = LoginRespons.auth_key;
            //         $localStorage.logSave = vm.login.save;
            //         console.log(LoginRespons);
            //         $sessionStorage.user = LoginRespons;
            //         $localStorage.user = LoginRespons;
            //         $state.go('menu.homepage')
            //     });
        }
    }
})();