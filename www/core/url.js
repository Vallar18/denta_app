;(function () {

    'use strict';

    angular
        .module('factory.url', [])
        .factory('url', url);

    url.$inject = [];

    function url() {

        var baseUrl = 'http://denta.grassbusinesslabs.tk/api/';

        return {
            code: {
                send: baseUrl + 'code/send',
                verify: baseUrl + 'code/verify'
            },
            register: {
                user: baseUrl + 'register/user',
                user_role: baseUrl + 'register/user-role'
            },
            clinic: {
                check: baseUrl + 'clinic/check',
                create: baseUrl + 'clinic/create'
            }
        };
    }
})();