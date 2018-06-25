;(function () {
    'use strict';

    angular.module('service.historySvc', []).factory('historySvc', historySvc);

    historySvc.$inject = ['url','http'];

    function historySvc(url,http) {
        var model = {
            patient: patient,
            dentistOwners: dentistOwners,
            dentist: dentist
        };
        return model;

        function patient(){
            return http.get(url.history.patient);
        }

        function dentistOwners(data){
            return http.get(url.history.dentistOwners);
        }

        function dentist(data){
            return http.get(url.history.dentist)
        }

    }
})();