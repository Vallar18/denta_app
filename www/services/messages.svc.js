;(function () {
    'use strict';

    angular
        .module('service.messagesSvc', [])
        .factory('messagesSvc', messagesSvc);

    messagesSvc.$inject = [];

    function messagesSvc() {
        let model = {
            notification: {
                test: 'Test'
            },
            error: {
                somthWrong: 'Something went wrong',
                test: 'Test',
                emptyCode: 'Please select phone code',
                invalidPhone: 'The number should be 8 to 20 digits',
                invalidCode: 'The code should consist of 4 digits',
                invalidEmail: 'Please enter the correct email',
                emptyField: 'Please fill in all fields',
                emptySpec: 'Please choose a specialty',
                selectClinicName: 'Please choose a clinic',
                emptyReview: 'Please write review text',
                correctPrice: 'Please input correct price',
                emptyAddress: 'Address not found, enter manually',
                notGetContact: 'It is not possible to access the phone book',
                checkClinickOnMap: 'Check that you have indicated the location of the clinic on the map',
                fcm: 'Error with Firebase. Please, check the Internet connection and restart the application',
                avatar: 'Please adding avatar for profile',
                buy: 'Please check that you have an authorized google account and have money on your account, also check internet available.',
                network: 'Please check your internet connection and try again or reopen application'
            },
            success: {
                test: 'Test',
                sendPatientEmergency: 'A notification was sent to the patient',
                buy: 'Purchase was successful!'
            },
            warning: {
                checkCodePhone: 'Check the entered phone and code',
            },
            quest: {
               clinicPhone: 'The clinic with this phone number has already existed. Would you like to use this data?',
                backAsk: 'You have not completed registration, would you like to go back to adding a phone?',
                number: 'Which number of your doctor would you like to choose?',
                deletePhoto: 'Are you sure you want to delete this photo?',
            }
        };

        return model;

    }
})();