;(function () {
    'use strict'

    angular
        .module('app')
        .controller('SelectRoleCtrl', SelectRoleCtrl);

    SelectRoleCtrl.$inject = ['$state', 'userSvc', '$localStorage'];

    function SelectRoleCtrl($state, userSvc, $localStorage) {
        var vm = this;
        vm.select = select;

        vm.content = {
            val3: 'get me in',
            valBtn: 'Send',
            role1: 'I\'m a dentist',
            role2: 'I\'m a patient'
        };
        vm.role = undefined;

        function select(type) {
            var role;
            if (type === 0){
                role = userSvc.roleConst().doctor;
                $state.go('registration-dentist');
            } else {
                role =  userSvc.roleConst().patient;
                $state.go('registration-patient');
            }
            userSvc.setRole(role);
        }
    }

})();