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
        vm.key = $localStorage.key;
        console.log(vm.key)
        vm.user = {
            name: '',
            lastname: '',
            email: undefined,
            phone: vm.phone,
            key: vm.key
        };

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
                regSvc.sendUser(vm.user).then(function (data) {
                    if(data.success) {
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                if(vm.showContentDentist){
                                    $state.go('add-clinic');
                                } else {
                                    $state.go('add-dentist-phone')
                                }
                            }
                        });
                        vm.code = '';
                    } else {
                        toastr.error(data.message)
                    }
                }, function (err) {
                    if(err.phone && angular.isArray(err.phone)){
                        toastr.error(err.phone.reduce(function (acc, current) {
                            return acc + '\n' + current;
                        }, ''))
                    }
                });
                vm.user = {
                    name: '',
                    lastname: '',
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