;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$state', 'regSvc', 'toastr'];

    function AddClinicCtrl($state, regSvc, toastr) {
        const vm = this;
        vm.next = next;


        function next() {
            $state.go('add-specialities')
        }
    }

})();