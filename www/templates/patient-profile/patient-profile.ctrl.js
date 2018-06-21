;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state', 'userSvc','authSvc'];

    function PatientProfileCtrl($state, userSvc, authSvc) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.user = userSvc.getUser();
        vm.logout = authSvc.logout;
        vm.profile = {
            name: vm.user.name,
            last_name: vm.user.lastname
        };

        function editPatient() {
            $state.go('registration-patient', {edit: true})
        }
        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true})
        }
    }
})();