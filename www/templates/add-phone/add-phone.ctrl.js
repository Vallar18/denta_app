;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc', '$ionicPopup', 'codes','phoneSvc'];

    function AddPhoneCtrl($scope, $state, $localStorage, regSvc, toastr, messagesSvc, $ionicPopup, codes, phoneSvc) {
        const vm = this;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.codes = codes;
        vm.select_code = vm.codes[235].code;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            valBtn: 'Send'
        }

        function send() {
            if(validPhone()){
                let send = {
                    phone: vm.sum_phone
                };
                regSvc.sendPhone(send).then(function (data) {
                    if(data.success) {
                        console.log(data.data);
                        $localStorage.alertcode = data.data;
                        toastr.success(data.data,null,{
                            timeOut:20000,
                            tapToDismiss: true
                        });
                        $state.go('add-code');
                        $localStorage.valView = false;
                        $localStorage.phone = vm.sum_phone;
                        vm.phone = '';
                    }else {
                        if(data.message){
                            toastr.error(data.message)
                            //getinfo login

                        }
                    }
                });
            } else {
                toastr.error(messagesSvc.error.invalidPhone)
            }
        }
        function validPhone() {
            if(vm.phone !== ''){
                vm.sum_phone = vm.select_code + vm.phone;
                vm.len_phone = vm.sum_phone.toString().length;
                if(vm.len_phone> 8 && vm.len_phone< 20){
                    return true;
                } else {
                    return false;
                }
            }
        }
        function getSelectCode() {
            $scope.data = {};
            vm.codePopup = phoneSvc.showSelect($scope);
        }
        function selectCode(code) {
            vm.select_code = code.code;
            vm.codePopup.close();
        }
    }

})();
