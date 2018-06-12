;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc,);

    regSvc.$inject = ['url', 'http', 'toastr'];

    function regSvc(url, http, toastr) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendVerify = sendVerify;
        model.sendRole = sendRole;
        model.sendUserInfo = sendUserInfo;
        return model;

        function sendPhone (phone) {
            console.log('phone number:', phone);
            return http.post(url.code.send, phone)
        }
        function sendVerify (verify) {
            console.log('verify', verify);
            return http.post(url.code.verify, verify)
        }
        function sendRole(role) {
            console.log('user role:', role);
            return true;
        }
        function sendUserInfo(userData) {
            console.log(userData)
            return;
        }
    }
})();