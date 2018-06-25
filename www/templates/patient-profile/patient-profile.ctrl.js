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
        vm.user = userSvc.getUser();
        vm.logout = authSvc.logout;
        vm.pat_den_binding = userSvc.isPatientDentistBinding();
        vm.home_dentist = userSvc.getPatientDentistBinding()[0].user;

        function editPatient() {
            $state.go('registration-patient', {edit: true})
        }

        function editDentistPhone() {
            $state.go('add-dentist-phone', {edit: true})
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