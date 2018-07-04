;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc);

    regSvc.$inject = ['url', 'http'];

    function regSvc(url, http) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendVerify = sendVerify;
        model.sendUser = sendUser;
        model.sendClinicPhone = sendClinicPhone;
        model.createClinic = createClinic;
        model.changeClinic = changeClinic;
        model.addRolePatient = addRolePatient;
        return model;

        function sendPhone (phone) {
            return http.post(url.code.send, phone);
        }
        function sendVerify (verify) {
            return http.post(url.code.verify, verify);
        }
        function sendUser (user) {
            return http.post(url.register.user, user);
        }
        function sendClinicPhone (phone) {
            return http.post(url.clinic.check, phone);
        }
        function createClinic (data) {
            return http.post(url.clinic.create, data);
        }
        function changeClinic (data) {
            return http.post(url.clinic.change, data);
        }
        function addRolePatient(data) {
            return http.post(url.register.user_role, data);
        }

    }
})();