;(function () {
    'use string'

    angular
        .module('app')
        .controller('SelectRoleCtrl', SelectRoleCtrl);

    SelectRoleCtrl.$inject = ['$state', 'regSvc', '$localStorage'];

    function SelectRoleCtrl($state, regSvc, $localStorage) {
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
            } else {
                vm.role = 'patient'
            }
            $localStorage.role = vm.role;
            $state.go('registration');
        }
    }

})();