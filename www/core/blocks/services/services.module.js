;(function () {
    'use strict';

    angular.module('app.services', [
        'service.geoSvc',
        'service.networkMonitorSvc',
        'service.authSvc',
        'service.userSvc',
        'service.regSvc',
        'service.messagesSvc'
    ]);
})();