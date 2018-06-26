;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http','url','$localStorage'];

    function dentistSvc(http, url,$localStorage) {
        var model = {
            invite: invite,
            updateClinic: updateClinic,
            checkDentistInvite: checkDentistInvite,
            addInviteDentist: addInviteDentist,
            // saveBecomeDenClinic: saveBecomeDenClinic,
            // getBecomeDenClinic: sgetBecomeDenClinic,
            sendBecomeDen: sendBecomeDen,

        };
        return model;

        function invite(data){
            return http.post(url.invite.dentist,data);
        }

        function checkDentistInvite(data){
            return http.post(url.invite.checkDentist,data);
        }

        function updateClinic(data){
            return http.post(url.clinic.update,data);
        }

        function addInviteDentist(data) {
            return http.post(url.relate.dentist, data)
        }

        // function saveBecomeDenClinic(clinic) {
        //     $localStorage.become_dentist_clinic = clinic;
        // }

        // function getBecomeDenClinic() {
        //     return $localStorage.become_dentist_clinic;
        // }
        function sendBecomeDen(data){
            return http.post(url.user.become_dentist, data);
        }
    }
})();