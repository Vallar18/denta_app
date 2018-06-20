;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state'];

    function PatientProfileCtrl($state) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.logout = function () {
            ionic.Platform.exitApp();
        };
        vm.profile = {
            name: 'Test Name Profile'
        }

        function editPatient() {
            $state.go('registration-patient', {edit: true})
        }
        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true})
        }
    }
})();