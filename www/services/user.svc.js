;(function () {
    'use strict';

    angular.module('service.userSvc', []).factory('userSvc', userSvc);

    userSvc.$inject = [];

    function userSvc() {
        var model = {};
        return model;
    }
})();