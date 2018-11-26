;(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyPatientCtrl', MyPatientCtrl);

    MyPatientCtrl.$inject = ['authSvc', '$scope', 'phoneSvc', 'codeItems', '$ionicPopup', 'toastr', 'messagesSvc','emergenciesSvc','userSvc'];

    function MyPatientCtrl(authSvc, $scope, phoneSvc, codeItems, $ionicPopup, toastr, messagesSvc, emergenciesSvc, userSvc) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.checkKey = checkKey;
        vm.codes = codeItems;
        getLoc();
        vm.phone = '';
        vm.select_code = '+1';

        function getLoc() {
            $.getJSON("http://ip-api.com/json/?callback=?", function (data) {
                phoneSvc.setDefaultCountry(data.country);
                vm.selectedCountry = vm.codes[phoneSvc.getDefaultIndex()];
                vm.select_code = vm.selectedCountry.code;
            });
        }
        authSvc.addBackBehave(false);
        function send() {
            let phone = phoneSvc.preparePhone(vm.select_code, vm.phone);
            if (!phoneSvc.validatePhone(phone)) {
                toastr.error(messagesSvc.error.invalidPhone);
                return;
            }
            emergenciesSvc.create({
                user_id: +userSvc.getUser().id,
                patient_phone: phone
            }).then(function(res){
                if(res.success)   {
                    toastr.success(messagesSvc.success.sendPatientEmergency);
                    vm.phone = '';
                } else if(!res.success && res.message){
                    toastr.error(res.message);
                }
                vm.phone = '';
            });
            // $state.go('tabs.history-emergencies');
        }

        function checkKey(event) {
            if(event.which === 13) {
                send()
            }
        }

        function getSelectCode() {
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            vm.selectedCountry = code;
            vm.codePopup.close();
        }
    }
})();