;(function () {
    'use string'

    angular
        .module('app')
        .controller('RegPatCtrl', RegPatCtrl);

    RegPatCtrl.$inject = ['$state', 'regSvc', 'authSvc', 'toastr', '$localStorage', 'messagesSvc', 'userSvc'];

    function RegPatCtrl($state, regSvc, authSvc, toastr, $localStorage, messagesSvc, userSvc) {
        const vm = this;
        vm.send = send;
        vm.phone = authSvc.getPhone();
        vm.key = authSvc.getKey();
        vm.croppedDataUrl = '';
        vm.user = {
            name: '',
            lastname: '',
            email: '',
            phone: vm.phone,
            key: vm.key,
        };

        function send() {
            if(validation()){
                regSvc.sendUser(vm.user).then(function (data) {
                    processRegSuccess(data);
                }, function (err) {
                    processRegError(err);
                });
            }
        }

        function processRegSuccess(data){
            if(data.success) {
                $state.go('add-dentist-phone');
                userSvc.setUser(data.user);
                userSvc.setToken(data.token);
                vm.user = {
                    name: '',
                    lastname: '',
                    email: '',
                    phone: vm.phone,
                    key: vm.key,
                };
            } else {
                toastr.error(data.message);
            }
        }

        function processRegError(err){
            if(err.phone && angular.isArray(err.phone)){
                toastr.error(err.phone.reduce(function (acc, current) {
                    return acc + '\n' + current;
                }, ''))
            }
        }

        function validation() {
            if(vm.user.email === undefined){
                toastr.error(messagesSvc.error.invalidEmail);
                return false
            }
            if (vm.user.name === '' || vm.user.lastname === ''){
                toastr.error(messagesSvc.error.emptyField);
                return false;
            }
            return true;
        }

    }

})();