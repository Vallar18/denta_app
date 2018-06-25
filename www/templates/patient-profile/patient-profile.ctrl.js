;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = ['$state', 'userSvc', 'authSvc', '$ionicPlatform'];

    function PatientProfileCtrl($state, userSvc, authSvc, $ionicPlatform) {
        var vm = this;
        vm.editPatient = editPatient;
        vm.editDentistPhone= editDentistPhone;
        vm.share = share;
        vm.invite = invite;
        vm.user = userSvc.getUser();
        vm.logout = authSvc.logout;
        vm.have_den = userSvc.isHaveDentist();

        if(userSvc.getPatientDentist() && userSvc.getPatientDentist()[0]){
            vm.home_dentist = userSvc.getPatientDentist()[0].user;
        }

        function editPatient() {
            $state.go('registration-patient', {edit: true})
        }

        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true})
        }

        function invite() {
            $state.go('add-dentist-phone', {c_invite: true})
        }

        function share() {
            $ionicPlatform.ready(function () {
                var message = 'You can install this application using the following links: https://play.google.com/store/apps/details...';
                $cordovaSocialSharing
                    .share(message, null, null, null) // Share via native share sheet
                    .then(function (result) {
                        // Success!
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
            });
        }
    }
})();