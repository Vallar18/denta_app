;(function () {
    'use strict';

    angular
        .module('service.messagesSvc', [])
        .factory('messagesSvc', messagesSvc);

    messagesSvc.$inject = ['$translate'];

    function messagesSvc($translate) {
        var vm = this;
        vm.translateArrErrors = [];
        vm.translateArrQuests = [];
        vm.translateArrSuccess = [];
        vm.errorObj = {};
        vm.successObj = {};
        vm.warningObj = {};
        vm.questObj = {};

        let model = {
            translateMessages: translateMessages,
            notification: {
                test: 'Test'
            },
            error: getErrors,
            success: getSuccess,
            warning: getWarning,
            quest: getQuest
        };

        function translateMessages() {
            getTranslateIten('success', 'SUCCESS.SEND_PATIENT_EMERGENCY');
            getTranslateIten('quest', 'QUEST.CLINIC_PHONE');
            getTranslateIten('quest', 'QUEST.BACK_REGISTRATION');
            getTranslateIten('quest', 'QUEST.DOCTOR_NUMBER');
            getTranslateIten('quest', 'ERROR.DELETE_PHOTO');
            getTranslateIten('error', 'ERROR.CHECK_CODE_PHONE');
            getTranslateIten('error', 'ERROR.SOMETHING_WRONG');
            getTranslateIten('error', 'ERROR.EMPTY_CODE');
            getTranslateIten('error', 'ERROR.INVALID_PHONE');
            getTranslateIten('error', 'ERROR.INVALID_CODE');
            getTranslateIten('error', 'ERROR.INVALID_EMAIL');
            getTranslateIten('error', 'ERROR.EMPTY_FIELD');
            getTranslateIten('error', 'ERROR.EMPTY_SPECIALITY');
            getTranslateIten('error', 'ERROR.CHOOSE_CLINIC_NAME');
            getTranslateIten('error', 'ERROR.EMPTY_CLINIC_NAME');
            getTranslateIten('error', 'ERROR.CORRECT_PRICE');
            getTranslateIten('error', 'ERROR.EMPTY_ADDRESS');
            getTranslateIten('error', 'ERROR.NOT_POSSIBLE_PHONE_BOOK');
            getTranslateIten('error', 'ERROR.CHECK_CLINIC_ON_MAP');
            getTranslateIten('error', 'ERROR.FIREBASE_CHECK_INTERNET');
            getTranslateIten('error', 'ERROR.ADDING_AVATAR');
            getTranslateIten('error', 'ERROR.NETWORK');
        }

        function getErrors(){
            return vm.errorObj;
        }

        function setErrors(){
            vm.errorObj = {
                test: 'Test',
                somthWrong: vm.translateArrErrors[1] || 'Something went wrong',
                emptyCode: vm.translateArrErrors[2] || 'Please select phone code',
                invalidPhone: vm.translateArrErrors[3] || 'The number should be 8 to 20 digits',
                invalidCode: vm.translateArrErrors[4] || 'The code should consist of 4 digits',
                invalidEmail: vm.translateArrErrors[5] || 'Please enter the correct email',
                emptyField: vm.translateArrErrors[6] || 'Please fill in all fields',
                emptySpec: vm.translateArrErrors[7] || 'Please choose a specialty',
                selectClinicName: vm.translateArrErrors[8] || 'Please choose a clinic',
                emptyReview: vm.translateArrErrors[9] || 'Please write review text',
                correctPrice: vm.translateArrErrors[10] || 'Please input correct price',
                emptyAddress: vm.translateArrErrors[11] || 'Address not found, enter manually',
                notGetContact: vm.translateArrErrors[12] || 'It is not possible to access the phone book',
                checkClinickOnMap: vm.translateArrErrors[13] || 'Check that you have indicated the location of the clinic on the map',
                fcm: vm.translateArrErrors[14] || 'Error with Firebase. Please, check the Internet connection and restart the application',
                avatar: vm.translateArrErrors[15] || 'Please adding avatar for profile',
                buy: vm.translateArrErrors[16] || 'Please check that you have an authorized google account and have money on your account, also check internet available.',
                network: vm.translateArrErrors[17] || 'Please check your internet connection and try again or reopen application'
            }
        }

        function getSuccess(){
            return vm.successObj;
        }

        function setSuccess() {
           vm.succeessObj =  {
                test: 'Test',
                    sendPatientEmergency: vm.translateArrSuccess[0] || 'A notification was sent to the patient',
                buy: 'Purchase was successful!'
            }
        }

        function getWarning(){
            return vm.warningObj;
        }

        function setWarning() {
            vm.warningObj =  {
                checkCodePhone: vm.translateArrErrors[0] || 'Check the entered phone and code',
            }
        }

        function getQuest(){
            return vm.questObj;
        }

        function setQuest() {
            vm.questObj =  {
                clinicPhone: vm.translateArrQuests[0] || 'The clinic with this phone number has already existed. Would you like to use this data?',
                backAsk: vm.translateArrQuests[1] || 'You have not completed registration, would you like to go back to adding a phone?',
                number: vm.translateArrQuests[2] || 'Which number of your doctor would you like to choose?',
                deletePhoto: vm.translateArrQuests[3] || 'Are you sure you want to delete this photo?',
            }
        }

        function getTranslateIten(type, path) {
            $translate(path).then(function (text) {
                if (type === 'success') {
                    vm.translateArrSuccess.push(text)
                } else if (type === 'quest') {
                    vm.translateArrQuests.push(text)
                } else {
                    vm.translateArrErrors.push(text);
                }
                if (path === 'ERROR.NETWORK') {
                    setErrors();
                    setSuccess();
                    setWarning();
                    setQuest();
                }
            });
        }
            return model;
    }
})();