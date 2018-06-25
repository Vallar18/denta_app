;(function () {
    'use strict';

    angular.module('service.specSvc', []).factory('specSvc', specSvc);
    specSvc.$inject = ['http', '$ionicPopup', 'url'];

    function specSvc(http, $ionicPopup, url) {
        var model = {
            addSpeciality : addSpeciality,
            getSpeciality:  getSpeciality,
            updateSpeciality: updateSpeciality
        };
        return model;

        function addSpeciality(data) {
            console.log('post data user speciality:', data);
            return http.post(url.register.user_role, data);
        }
        function getSpeciality() {
            return http.get(url.specialties)
        }
        function updateSpeciality(data) {
            return http.post(url.user_role.update, data)
        }
    }
})();