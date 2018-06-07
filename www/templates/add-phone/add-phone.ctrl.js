;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc'];

    function AddPhoneCtrl($state, $localStorage, regSvc) {
        const vm = this;
        vm.send = send;
        vm.selectNumberCode = selectNumberCode;
        vm.phone = '';
        vm.item = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            val4: '+380',
            valBtn: 'Send'
        }

        function selectNumberCode() {
            console.log('select number code')
        }

        function send() {
            validPhone();
            if(validPhone()){
                let phone = vm.item.val4 + vm.phone;
                regSvc.sendPhone(phone);
                $state.go('add-code');
                $localStorage.valView = false;
                vm.phone = '';
            }
        }
        function validPhone() {
            let phoneLength = vm.phone.toString().length;
            if(phoneLength > 5){
                return true;
            } else {
                return false;
            }
        }
    }

})();
