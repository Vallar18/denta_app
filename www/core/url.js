;(function () {

    'use strict';

    angular
        .module('factory.url', [])
        .factory('url', url);

    url.$inject = [];

    function url() {

        var baseUrl = 'http://denta.grassbusinesslabs.tk/api/';

        return {
            help: {
                getItems: baseUrl + 'help'
            },
            question: {
                all: baseUrl + 'question'
            },
            logout: {
              logout: baseUrl + 'logout'
            },
            emergencies: {
                create: baseUrl + 'emergency/create',
                addPhotos: baseUrl + 'emergency/photos',
                deletePhotos: baseUrl + 'emergency/photos/delete',
                activate: baseUrl + 'emergency/activate',
                changeToViewed: baseUrl + 'emergency/viewed',
            },
            history: {
              patient:  baseUrl + 'patient/history',
              dentistOwners:  baseUrl + 'dentists/owners/history',
              dentist:  baseUrl + 'dentist/history',
            },
            review: {
                create: baseUrl + 'review/create',
                getAll: baseUrl + 'reviews'
            },
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
                change: baseUrl + 'clinic/change',
                create: baseUrl + 'clinic/create',
                update: baseUrl + 'clinic/update',
                getAll: baseUrl + 'clinics'
            },
            specialties: baseUrl + 'specialties',
            currencies: baseUrl + 'currencies',
            invite: {
                dentist: baseUrl + 'invite/dentist',
                checkDentist: baseUrl + 'check/dentist'
            },
            user: {
                update: baseUrl + 'user/update',
                id: baseUrl + 'user',
                info: baseUrl + 'user/',
                become_dentist: baseUrl + 'user/become-dentist'
            },
            user_role: {
                update: baseUrl + 'user-role/update'
            },
            relate: {
                dentist: baseUrl + 'relate/dentist'
            },
            subscribe: baseUrl + 'subscribe'
        };
    }
})();