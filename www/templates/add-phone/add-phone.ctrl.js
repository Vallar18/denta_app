;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc'];

    function AddPhoneCtrl($state, $localStorage, regSvc, toastr, messagesSvc) {
        const vm = this;
        vm.send = send;
        vm.selectNumberCode = selectNumberCode;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            val4: '380',
            valBtn: 'Send'
        }

        function selectNumberCode() {
            console.log('select number code')
        }

        function send() {
            if(validPhone()){
                let phone = vm.content.val4 + vm.phone;
                let send = {
                    phone: phone
                };
                regSvc.sendPhone(send).then(function (data) {
                    if(data.success) {
                        console.log(data.data)
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('add-code');
                            }
                        });
                        $localStorage.valView = false;
                        $localStorage.phone = phone;
                        vm.phone = '';
                    }
                });
            } else {
                toastr.error(messagesSvc.error.invalidPhone)
            }
        }
        function validPhone() {
            if(vm.phone !== ''){
                let phoneLength = vm.phone.toString().length;
                if(phoneLength > 5 && phoneLength < 12){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

})();
