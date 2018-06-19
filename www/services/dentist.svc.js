;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http','url'];

    function dentistSvc(http, url) {
        var model = {
            invite: invite
        };
        return model;

        function invite(data){
            return http.post(url.invite.dentist,data);
        }
    }
})();