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
                invalidPhone: 'The number should be 8 to 20 digits',
                invalidCode: 'The code should consist of 4 digits',
                invalidEmail: 'Please enter the correct email',
                emptyField: 'Please fill in all fields',
                emptySpec: 'Please choose a specialty',
                selectClinicName: 'Please choose a clinic',
                emptyReview: 'Please write review text',
                emptyAddress: 'Address not found, enter manually',
                notGetContact: 'It is not possible to access the phone book',
                checkClinickOnMap: 'Check that you have indicated the location of the clinic on the map'
            },
            success: {
                test: 'Test',
                sendPatientEmergency: 'A notification was sent to the patient'
            }
        };

    }
})();