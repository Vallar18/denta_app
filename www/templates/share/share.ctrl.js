;(function () {
    'use string';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$cordovaSocialSharing', '$ionicPlatform'];

    function ShareCtrl($cordovaSocialSharing, $ionicPlatform) {
        const vm = this;
        vm.share = share;

        function share() {
            $ionicPlatform.ready(function () {
                var message = 'Test messages';
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