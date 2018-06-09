;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc);

    regSvc.$inject = ['url', 'http'];

    function regSvc(url, http) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendVerify = sendVerify;
        model.sendRole = sendRole;
        model.sendUserInfo = sendUserInfo;
        return model;

        function sendPhone (phone) {
            console.log('phone number:', phone);
            // return http.post(url.code.send, phone);
        }
        function sendVerify (code) {
            console.log('code:', code);
            // return http.post(url.code.verify, code);
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