;(function () {
    'use string'

    angular
        .module('app')
        .controller('selectRoleCtrl', selectRoleCtrl);

    selectRoleCtrl.$inject = ['$state'];

    function selectRoleCtrl($state) {
        const vm = this;
        vm.select = select;

        vm.item = {
            val3: 'get me in',
            valBtn: 'Send',
            role1: 'I\'m a dentist',
            role2: 'I\'m a patient'
        }

        function select(type) {
            if (type === 0){
                console.log('dentist')
            } else {

                console.log('patient')
            }
        }
    }

})();