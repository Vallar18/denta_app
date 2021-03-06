;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http', 'url'];

    function dentistSvc(http, url) {
        var model = {
            invite: invite,
            updateClinic: updateClinic,
            checkDentistInvite: checkDentistInvite,
            addInviteDentist: addInviteDentist,
            sendBecomeDen: sendBecomeDen,
        };

        return model;

        function invite(data) {
            return http.post(url.invite.dentist, data);
        }

        function checkDentistInvite(data) {
            return http.post(url.invite.checkDentist, data);
        }

        function updateClinic(data) {
            return http.post(url.clinic.update, data);
        }

        function addInviteDentist(data) {
            return http.post(url.relate.dentist, data);
        }

        function sendBecomeDen(data) {
            return http.post(url.user.become_dentist, data);
        }
    }
})();