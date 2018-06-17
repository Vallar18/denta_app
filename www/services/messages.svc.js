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
                test: 'Test',
                emptyCode: 'Please select phone code',
                invalidPhone: 'The number should be 5 to 10 digits',
                invalidCode: 'The code should consist of 4 digits',
                invalidEmail: 'Please enter the correct email',
                emptyField: 'Please fill in all fields',
                emptySpec: 'Please choose a specialty',
                emptyReview: 'Please write review text'
            },
            success: {
                test: 'Test'
            }
        };

    }
})();