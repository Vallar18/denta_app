;(function () {
    'use strict';

    angular.module('service.regSvc', []).factory('regSvc', regSvc);

    regSvc.$inject = ['url', 'http'];

    function regSvc(url, http) {
        var model = {};
        model.sendPhone = sendPhone;
        model.sendCode = sendCode;
        return model;

        function sendPhone (phone) {
            console.log('phone number:', phone);
            return true;
        }
        function sendCode (code) {
            console.log('code:', code);
            return true;
        }

    }
})();