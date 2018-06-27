;(function () {
    'use strict';

    angular.module('service.helpSvc', []).factory('helpSvc', helpSvc);

    helpSvc.$inject = ['url','http'];

    function helpSvc(url, http) {
        var model = {
            getByPos: getByPos
        };
        return model;

        function getByPos(data){
            return http.post(url.help.getItems,data);
        }
    }
})();