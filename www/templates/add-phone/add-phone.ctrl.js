;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc', 'toastr'];

    function AddPhoneCtrl($state, $localStorage, regSvc, toastr) {
        const vm = this;
        vm.send = send;
        vm.selectNumberCode = selectNumberCode;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            val4: '+380',
            valBtn: 'Send'
        }

        function selectNumberCode() {
            console.log('select number code')
        }

        function send() {
            if(validPhone()){
                let phone = vm.content.val4 + vm.phone;
                regSvc.sendPhone(phone);
                $state.go('add-code');
                $localStorage.valView = false;
                vm.phone = '';
            } else {
                toastr.error('The number should be ...')
            }
        }
        function validPhone() {
            if(vm.phone !== ''){
                let phoneLength = vm.phone.toString().length;
                if(phoneLength > 5){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

})();
