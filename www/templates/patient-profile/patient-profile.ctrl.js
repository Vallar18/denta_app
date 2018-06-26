;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state', 'userSvc', 'authSvc', 'textSvc'];

    function PatientProfileCtrl($state, userSvc, authSvc, textSvc) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.share = share;
        vm.invite = invite;
        vm.user = userSvc.getUser();
        vm.logout = authSvc.logout;
        vm.have_den = userSvc.isHaveDentist();

        authSvc.addBackBehave(false);
        if(userSvc.getPatientDentist() && userSvc.getPatientDentist()[0]){
            vm.home_dentist = userSvc.getPatientDentist()[0];
        }

        function editPatient() {
            $state.go('registration-patient', {edit: true});
            authSvc.addBackBehave(true);
        }

        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true});
            authSvc.addBackBehave(true);
        }

        function invite() {
            $state.go('add-dentist-phone', {c_invite: true});
        }

        function share() {
            textSvc.share();
        }
    }
})();