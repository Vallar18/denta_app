;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http','url'];

    function dentistSvc(http, url) {
        var model = {
            invite: invite,
            checkDentist: checkDentist
        };
        return model;

        function invite(data){
            return http.post(url.invite.dentist,data);
        }

        function checkDentist(data){
            return http.post(url.invite.checkDentist,data);
        }
    }
})();