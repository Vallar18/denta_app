;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneController', AddPhoneController);

    AddPhoneController.$inject = ['$state'];

    function AddPhoneController($state) {
        const vm = this;
        vm.send = send;

        vm.item = {
            val1: 'You will receive sms with code '
        }

        function send() {
            $state.go('add-code')
        }
    }

})();