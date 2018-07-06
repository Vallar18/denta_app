;(function () {
    'use strict';

    angular.module('service.textSvc', []).factory('textSvc', textSvc);

    textSvc.$inject = ['$ionicPlatform','$cordovaSocialSharing', '$q', 'http', 'url'];

    function textSvc($ionicPlatform,$cordovaSocialSharing, $q, http, url) {
        var model = {
            getShare: getShare,
            getPrivacy: getPrivacy,
            getAbout: getAbout,
            getTerms: getTerms,
            getStartPage: getStartPage,
            share: share
        };

        function share(text){
            return $cordovaSocialSharing.share(text, null, null, null);
        }

        function getShare(){
            return http.get(url.static.share).then(function (res) {
                if(res){
                    return share(res.description)
                }
            });
        }

        function getPrivacy(){
            return http.get(url.static.privacy);
            // return 'getPrivacy'
        }

        function getAbout(){
            return http.get(url.static.about);
        }

        function getTerms(){
            return http.get(url.static.terms);
        }

        function getStartPage(){
            return http.get(url.static.start_page);
            // return 'getStartPage'
        }

        return model;
    }
})();