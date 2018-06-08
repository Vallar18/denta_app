;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc);

    regSvc.$inject = ['url', 'http'];

    function regSvc(url, http) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendCode = sendCode;
        model.sendRole = sendRole;
        model.sendUserInfo = sendUserInfo;
        return model;

        function sendPhone (phone) {
            console.log('phone number:', phone);
            return true;
        }
        function sendCode (code) {
            console.log('code:', code);
            return true;
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