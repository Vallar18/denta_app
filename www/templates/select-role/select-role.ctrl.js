;(function () {
    'use strict'

    angular
        .module('app')
        .controller('SelectRoleCtrl', SelectRoleCtrl);

    SelectRoleCtrl.$inject = ['$state', 'userSvc', '$localStorage'];

    function SelectRoleCtrl($state, userSvc, $localStorage) {
        const vm = this;
        vm.select = select;

        vm.content = {
            val3: 'get me in',
            valBtn: 'Send',
            role1: 'I\'m a dentist',
            role2: 'I\'m a patient'
        };
        vm.role = undefined;

        function select(type) {
            if (type === 0){
                vm.role = 'dentist';
                $state.go('registration-dentist');
            } else {
                vm.role = 'patient'
                $state.go('registration-patient');
            }
            userSvc.setRole(vm.role);
        }
    }

})();