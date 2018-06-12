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
        }

        function send() {
            if (validCode()) {
                regSvc.sendVerify({
                    phone: vm.phone,
                    code: "" + vm.code
                }
            ).then(function (data) {
                    if (data.success === true) {
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('select-role');
                            }
                        });
                        $localStorage.code = code;
                        vm.code = '';
                    } else {
                        toastr.error(data.message)
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
