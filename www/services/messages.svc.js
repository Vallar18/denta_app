;(function () {
    'use strict';

    angular
        .module('service.messagesSvc', [])
        .factory('messagesSvc', messagesSvc);

    messagesSvc.$inject = [];
    function messagesSvc() {

        return {
            notification: {
                test: 'Test'
            },
            error: {
                test: 'Test'
            },
            success: {
                test: 'Test'
            }
        };

    }
})();