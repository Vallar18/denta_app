;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state', 'userSvc', 'authSvc', 'textSvc', 'clinicSvc'];

    function PatientProfileCtrl($state, userSvc, authSvc, textSvc,clinicSvc) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.share = share;
        vm.invite = invite;
        vm.becomeDentist = becomeDentist;
        vm.user = userSvc.getUser();
        vm.logout = authSvc.logout;
        vm.have_den = userSvc.isHaveDentist();

        authSvc.addBackBehave(false);
        if(userSvc.getPatientDentist() && userSvc.getPatientDentist()[0]){
            vm.home_dentist = userSvc.getPatientDentist()[0];
        }
        getClinicAddress();

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
            textSvc.getShare();
        }

        function becomeDentist() {
            $state.go('registration-dentist', {become_den: true});
        }

        function getClinicAddress() {
            clinicSvc.getOne(vm.home_dentist.clinic_id).then(function (res) {
                if (res) {
                    vm.clinicAddress = [res][0].address;
                }
            })
        }
    }
})();