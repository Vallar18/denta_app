;(function () {
    'use string'

    angular
        .module('app')
        .controller('addPhoneCtrl', addPhoneCtrl);

    addPhoneCtrl.$inject = ['$state'];

    function addPhoneCtrl($state) {
        const vm = this;
        vm.send = send;
        vm.selectNumberCode = selectNumberCode;
        vm.item = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send',
        }

        function selectNumberCode() {
            console.log('select number code')
        }

        function send() {
            $state.go('add-code')
        }
    }

})();
