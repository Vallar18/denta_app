;(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyPatientCtrl', MyPatientCtrl);

    MyPatientCtrl.$inject = ['$ionicPopup', '$scope', 'phoneSvc', 'codeItems', '$state', 'toastr', 'messagesSvc','emergenciesSvc','userSvc'];

    function MyPatientCtrl($ionicPopup, $scope, phoneSvc, codeItems, $state, toastr, messagesSvc, emergenciesSvc, userSvc) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.codes = codeItems;
        var selectedCountry = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = selectedCountry.code;
        vm.phone = '';

        function send() {
            let phone = phoneSvc.preparePhone(vm.select_code, vm.phone);
            if (!phoneSvc.validatePhone(phone)) {
                toastr.error(messagesSvc.error.invalidPhone);
                return
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

        function getSelectCode() {
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            selectedCountry = code;
            vm.codePopup.close();
        }
    }
})();