;(function () {
    'use string'

    angular
        .module('app')
        .controller('addCodeCtrl', addCodeCtrl);

    addCodeCtrl.$inject = ['$state', '$localStorage'];

    function addCodeCtrl($state, $localStorage) {
        const vm = this;
        vm.send = send;
        vm.sendCode = sendCode;

$localStorage.valView = false;
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
            $state.go('add-phone')
        }
    }

})();
