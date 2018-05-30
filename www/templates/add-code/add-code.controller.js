;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeController', AddCodeController);

    AddCodeController.$inject = ['$state'];

    function AddCodeController($state) {
        const vm = this;
        vm.send = send;
        vm.sendCode = sendCode;

        vm.item = {
            val1: 'Didn\'t recived code',
            val2: 'click here',
            val3: 'get me in',
            valBtn: 'Send'
        }

        function send() {
            $state.go('select-role')
        }
        function sendCode() {
            console.log('send code')
        }
    }

})();