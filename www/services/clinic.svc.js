;(function () {
    'use strict';

    angular.module('service.clinicSvc', []).factory('clinicSvc', clinicSvc);

    clinicSvc.$inject = ['http','url'];

    function clinicSvc(http, url) {
        var model = {
            getAll: getAll
        };
        return model;

        function getAll(){
            return http.get(url.clinic.getAll);
        }
    }
})();