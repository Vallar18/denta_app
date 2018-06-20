;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state', 'userSvc'];

    function PatientProfileCtrl($state, userSvc) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.user = userSvc.getUser();
        vm.logout = function () {
            ionic.Platform.exitApp();
        };
        vm.profile = {
            name: vm.user.name
        }

        function editPatient() {
            $state.go('registration-patient', {edit: true})
        }
        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true})
        }
    }
})();