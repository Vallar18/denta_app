;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeCtrl', AddCodeCtrl);

    AddCodeCtrl.$inject = ['$state', 'regSvc'];

    function AddCodeCtrl($state, regSvc) {
        const vm = this;
        vm.send = send;
        vm.goAddPhone = goAddPhone;

        vm.code = '';
        vm.item = {
            val1: 'Didn\'t recived code',
            val2: 'click here',
            val3: 'get me in',
            valBtn: 'Send'
        }

        function send() {
            validCode();
            if(validCode()){
                regSvc.sendCode(vm.code);
                $state.go('select-role');
                vm.code = '';
            }
        }
        
        function validCode() {
            if(vm.code !== ''){
                let codeLength = vm.code.toString().length;
                if(codeLength === 4){
                    return true;
                } else {
                    return false;
                }
            }
        }
        
        function goAddPhone() {
            $state.go('add-phone')
            vm.code = '';
        }
    }

})();
