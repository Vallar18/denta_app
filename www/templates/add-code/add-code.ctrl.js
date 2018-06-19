;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeCtrl', AddCodeCtrl);

    AddCodeCtrl.$inject = ['$state', 'regSvc', 'authSvc', 'userSvc', 'toastr', 'messagesSvc', '$localStorage'];

    function AddCodeCtrl($state, regSvc, authSvc, userSvc, toastr, messagesSvc, $localStorage) {
        const vm = this;
        vm.send = send;
        vm.goAddPhone = goAddPhone;
        vm.phone = authSvc.getPhone();
        vm.code = '';
        vm.content = {
            val1: 'Didn\'t recived code',
            val2: 'click here',
            val3: 'get me in',
            valBtn: 'Send'
        };

        function send() {
            if(validCode()){
                vm.verify ={
                    phone: vm.phone,
                    code: "" + vm.code
                };
                regSvc.sendVerify(vm.verify).then(function (data) {
                    progressVerifySuccess(data);
                }, function (err) {
                    processRegError(err);
                });
            } else {
                toastr.error(messagesSvc.error.invalidCode)
            }
        }
        function progressVerifySuccess(data) {
            if(data.success) {
                if(data.user){
                    userSvc.setUser(data.user);
                    userSvc.setRole(data.user.roles[0].name);
                    if(userSvc.isDoc()){
                        console.log('doc')
                        $state.go('tabs.dentist-profile');
                    } else if(userSvc.isPat()){
                        console.log('pat')
                        $state.go('tabs.patient-profile');
                    }
                } else {
                    $state.go('select-role');
                    authSvc.setCode(vm.verify.code);
                    authSvc.setKey(data.authKey);
                    vm.code = '';
                }
            } else {
                if(data.message){
                    toastr.error(data.message)
                }
            }
        }
        function processRegError(err) {
            var err_text = '';
            angular.forEach(err, function (val, key) {
                if (angular.isArray(val)){
                    err_text += val.reduce(function (acc, current) {
                        return acc + '\n' + current;
                    }, '');
                }
            });
            if(err_text.length){
                toastr.error(err_text);
            }
        }

        function validCode() {
            if (vm.code !== '') {
                let code_len = vm.code.toString().length;
                if (code_len === 4) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        function goAddPhone() {
            $state.go('add-phone');
            vm.code = '';
        }
    }

})();
