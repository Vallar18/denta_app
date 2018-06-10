;(function () {
    'use string'

    angular
        .module('app')
        .controller('RegCtrl', RegCtrl);

    RegCtrl.$inject = ['$state', 'regSvc', 'toastr'];

    function RegCtrl($state, regSvc, toastr) {
        const vm = this;
        vm.send = send;
        vm.user = {
            name: '',
            lastName: '',
            email: undefined
        }

        function send() {
            if(validation()){
                regSvc.sendPhone(vm.user);
                // $state.go('add-code');
                vm.user = {
                    name: '',
                    lastName: '',
                    email: ''
                }
            }
        }
        function validation() {
        if(vm.user.email === undefined){
            toastr.error('Please enter the correct email');
            return false
        }
         if (vm.user.name === '' || vm.user.Lastname === 0){
             toastr.error('Please fill in all fields');
             return false;
         } else {
             return true;
         }
        }
    }

})();