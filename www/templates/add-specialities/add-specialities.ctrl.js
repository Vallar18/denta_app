;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddSpecialitiesCtrl', AddSpecialitiesCtrl);

    AddSpecialitiesCtrl.$inject = ['$state', 'regSvc', 'toastr'];

    function AddSpecialitiesCtrl($state, regSvc, toastr) {
        const vm = this;
        vm.next = next;


        function next() {
            $state.go('share')
        }
    }

})();