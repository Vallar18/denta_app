;(function () {
    'use strict';

    angular.module('service.clinicSvc', []).factory('clinicSvc', clinicSvc);

    clinicSvc.$inject = ['http','url'];

    function clinicSvc(http, url) {
        var model = {
            getAll: getAll,
            getOne: getOne,
        };
        return model;

        function getOne(id){
            return http.get(url.clinic.getOne + id);
        }

        function getAll(){
            return http.get(url.clinic.getAll);
        }
    }
})();