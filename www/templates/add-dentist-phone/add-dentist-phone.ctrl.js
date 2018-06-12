;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc'];

    function AddDentistPhoneCtrl($state, $localStorage, regSvc, toastr, messagesSvc) {
        const vm = this;
        vm.send = send;
        vm.skipAddPhoneDentist = skipAddPhoneDentist;

        function send() {
            $state.go('share')
        }

        function skipAddPhoneDentist() {
            $state.go('share')
        }

    }

})();