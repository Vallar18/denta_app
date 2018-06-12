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
        vm.role = $localStorage.role;
        vm.phone = $localStorage.phone;
        vm.user = {
            name: '',
            lastName: '',
            email: undefined,
            phone: vm.phone,
            key: ''
        }

        init()

        function init() {
            if(vm.role && vm.role){
                if(vm.role === 'dentist'){
                    vm.showContentDentist = true;
                } else{
                    vm.showContentDentist = false;
                }
            }
            console.log(vm.showContentDentist)
        }

        function send() {
            if(validation()){
                // regSvc.sendPhone(vm.user).then(function (res) {
                //
                // });
                if(vm.showContentDentist){
                    $state.go('add-clinic');
                } else {
                    $state.go('add-dentist-phone')
                }
                vm.user = {
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