;(function () {
    'use strict';

    angular.module('service.textSvc', []).factory('textSvc', textSvc);

    textSvc.$inject = ['$ionicPlatform','$cordovaSocialSharing','$q'];

    function textSvc($ionicPlatform,$cordovaSocialSharing, $q) {
        var model = {
            getShare: getShare,
            getPrivacy: getPrivacy,
            getAbout: getAbout,
            getStartPage: getStartPage,
            share: share
        };

        function share(){
            let defered = $q.defer();
            let message = 'Test messages for sharing';
            $ionicPlatform.ready(function () {
                $cordovaSocialSharing
                    .share(message, null, null, null) // Share via native share sheet
                    .then(function (result) {
                        defered.resolve(result);
                    }, function (err) {
                        defered.reject();
                    });
            });
            return defered.promise;
        }

        function getShare(){

        }

        function getPrivacy(){

        }

        function getAbout(){

        }

        function getStartPage(){

        }

        return model;
    }
})();