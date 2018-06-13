;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc,);

    regSvc.$inject = ['url', 'http', 'toastr'];

    function regSvc(url, http, toastr) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendVerify = sendVerify;
        model.sendUser = sendUser;
        model.sendClinicPhone = sendClinicPhone;
        model.createClinic = createClinic;
        model.addRolePatient = addRolePatient;
        model.addSpeciality = addSpeciality;
        model.getSpeciality = getSpeciality;
        return model;

        function sendPhone (phone) {
            console.log('phone number:', phone);
            return http.post(url.code.send, phone)
        }
        function sendVerify (verify) {
            console.log('verify', verify);
            return http.post(url.code.verify, verify)
        }
        function sendUser (user) {
            console.log('user:', user);
            return http.post(url.register.user, user)
        }
        function sendClinicPhone (phone) {
            console.log('clinic phone:', phone);
            return http.post(url.clinic.check, phone)
        }
        function createClinic (data) {
            console.log('create clinic', data);
            return http.post(url.clinic.create, data);
        }
        function addRolePatient(data) {
            console.log('post data user:', data)
            return http.post(url.register.user_role, data);
        }
        function addSpeciality(data) {
            console.log('post data user speciality:', data)
            return http.post(url.register.user_role, data);
        }
        function getSpeciality() {
            return http.get(url.specialties)
        }
    }
})();