;(function () {
    'use strict';

    angular.module('service.textSvc', []).factory('textSvc', textSvc);

    textSvc.$inject = [];

    function textSvc() {
        var model = {
            getShare: getShare,
            getPrivacy: getPrivacy,
            getAbout: getAbout,
            getStartPage: getStartPage
        };

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