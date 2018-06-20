;(function () {

    'use strict';

    angular
        .module('factory.url', [])
        .factory('url', url);

    url.$inject = [];

    function url() {

        var baseUrl = 'http://denta.grassbusinesslabs.tk/api/';

        return {
            codes: baseUrl + 'codes',
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
                create: baseUrl + 'clinic/create',
                update: baseUrl + 'clinic/update'
            },
            specialties: baseUrl + 'specialties',
            currencies: baseUrl + 'currencies',
            invite: {
                dentist: baseUrl + 'invite/dentist',
                checkDentist: baseUrl + 'check/dentist'
            },
            user: {
                update: baseUrl + 'user/update',
                id: baseUrl + 'user'
            },
            user_role: {
                update: baseUrl + 'user-role/update'
            }

        };
    }
})();