;(function () {
    'use strict';

    angular.module('service.notificationSvc', []).factory('notificationSvc', notificationSvc);

    notificationSvc.$inject = ['http','url'];

    function notificationSvc(http, url) {
        var model = {
        };
        return model;

    }
})();