;(function () {
    'use string'

    angular
        .module('app')
        .controller('RegCtrl', RegCtrl);

    RegCtrl.$inject = ['$state', 'regSvc', 'toastr', '$localStorage', 'messagesSvc'];

    function RegCtrl($state, regSvc, toastr, $localStorage, messagesSvc) {
        const vm = this;
        vm.send = send;
        vm.showContentDentist = undefined;
        vm.user = $localStorage.user;
        vm.user = {
            role: vm.user.role,
            name: '',
            lastName: '',
            email: undefined
        }

        init()

        function init() {
            if(vm.user && vm.user.role){
                if(vm.user.role === 'dentist'){
                    vm.showContentDentist = true;
                } else{
                    vm.showContentDentist = false;
                }
            }
            console.log(vm.showContentDentist)
        }

        function send() {
            if(validation()){
                regSvc.sendPhone(vm.user);
                $state.go('add-clinic');
                vm.user = {
                    role: vm.user.role,
                    name: '',
                    lastName: '',
                    email: ''
                }
            }
        }
        function validation() {
            if(vm.user.email === undefined){
                toastr.error(messagesSvc.error.invalidEmail);
                return false
            }
             if (vm.user.name === '' || vm.user.Lastname === 0){
                 toastr.error(messagesSvc.error.emptyField);
                 return false;
             } else {
                 return true;
             }
        }

    }

})();