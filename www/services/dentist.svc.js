;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http','url'];

    function dentistSvc(http, url) {
        var model = {
            invite: invite,
            checkDentistInvite: checkDentistInvite
        };
        return model;

        function invite(data){
            return http.post(url.invite.dentist,data);
        }

        function checkDentistInvite(data){
            return http.post(url.invite.checkDentist,data);
        }
    }
})();