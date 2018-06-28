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

        function getShare(data){
            return http.get(url.static.share, data).then(function (res) {
                if(res){
                    return share(res.description)
                }
            });
        }

        function getPrivacy(data){
            return http.get(url.static.privacy, data);
            // return 'getPrivacy'
        }

        function getAbout(){
            return http.get(url.static.about);
        }

        function getTerms(){
            return http.get(url.static.terms);
        }

        function getStartPage(data){
            return http.get(url.static.start_page, data);
            // return 'getStartPage'
        }

        return model;
    }
})();