;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeCtrl', AddCodeCtrl);

    AddCodeCtrl.$inject = ['$state', 'regSvc', 'toastr'];

    function AddCodeCtrl($state, regSvc, toastr) {
        const vm = this;
        vm.send = send;
        vm.goAddPhone = goAddPhone;

        vm.code = '';
        vm.content = {
            val1: 'Didn\'t recived code',
            val2: 'click here',
            val3: 'get me in',
            valBtn: 'Send'
        }

        function send() {
            // if(validCode()){
                regSvc.sendVerify(vm.code);
                $state.go('select-role');
                vm.code = '';
            // } else {
            //     toastr.error('The code should consist of 4 digits')
            // }
        }
        
        // function validCode() {
        //     if(vm.code !== ''){
        //         let codeLength = vm.code.toString().length;
        //         if(codeLength === 4){
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     }
        // }
        
        function goAddPhone() {
            $state.go('add-phone')
            vm.code = '';
        }
    }

})();
