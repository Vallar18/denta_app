;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeCtrl', AddCodeCtrl);

    AddCodeCtrl.$inject = ['$state', 'regSvc', 'toastr', 'messagesSvc', '$localStorage'];

    function AddCodeCtrl($state, regSvc, toastr, messagesSvc, $localStorage) {
        const vm = this;
        vm.send = send;
        vm.goAddPhone = goAddPhone;
        vm.phone = $localStorage.phone;
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
                    if(data.success) {
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('select-role');
                            }
                        });
                        $localStorage.code = vm.verify.code;
                        $localStorage.key = data.authKey;
                        vm.code = '';
                    } else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                }, function (err) {
                    if(err.phone){
                       error =  err.phone.toString();
                        toastr.error(error)
                    }
                });
            } else {
                toastr.error(messagesSvc.error.invalidCode)
            }
        }

        function validCode() {
            if (vm.code !== '') {
                let codeLength = vm.code.toString().length;
                if (codeLength === 4) {
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
