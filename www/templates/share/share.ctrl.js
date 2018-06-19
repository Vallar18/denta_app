;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$cordovaSocialSharing', '$ionicPlatform', '$state', '$localStorage'];

    function ShareCtrl($cordovaSocialSharing, $ionicPlatform, $state, $localStorage) {
        const vm = this;
        vm.share = share;
        vm.finish = finishReg;
        vm.role = $localStorage.role;

        function finishReg() {
            if (vm.role !== 'dentist') {
                $state.go('tabs.patient-profile');
            } else if (vm.role === 'dentist') {
                $state.go('tabs.dentist-profile');
            }
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