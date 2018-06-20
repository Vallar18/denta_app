;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$cordovaSocialSharing', '$ionicPlatform', '$state', 'userSvc'];

    function ShareCtrl($cordovaSocialSharing, $ionicPlatform, $state, userSvc) {
        const vm = this;
        vm.share = share;
        vm.finish = finishReg;

        function finishReg() {
            if (userSvc.isDoc()) {
                $state.go('tabs.dentist-profile');
            } else if (userSvc.isPat()) {
                $state.go('tabs.patient-profile');
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