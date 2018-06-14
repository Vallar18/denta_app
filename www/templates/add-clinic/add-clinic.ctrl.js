;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$state', 'regSvc', 'toastr', 'messagesSvc', '$localStorage'];

    function AddClinicCtrl($state, regSvc, toastr, messagesSvc, $localStorage) {
        const vm = this;
        vm.checkClinicPhone = checkClinicPhone;
        vm.next = next;
        vm.user = $localStorage.user;
        vm.phone = '';
        vm.clinic = {
            user_id: vm.user.id,
            name: '',
            phone: '',
            address: ''
        }

        function checkClinicPhone() {
            if(validPhone()){
                vm.clinic.phone = '380' + vm.phone;
                let send = {
                    phone: vm.clinic.phone
                };
                regSvc.sendClinicPhone(send).then(function (data) {
                    if(data.success) {
                        toastr.success(data.message);
                    } else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                });
            }
        }

        function next() {
            if(validation()){
                vm.clinic.phone = '380' + vm.phone;
                regSvc.createClinic(vm.clinic).then(function (data) {
                    if(data.success) {
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('add-specialities')
                            }
                        });
                        vm.clinc.name = '';
                        vm.clinic.address = '';
                        vm.phone = '';

                    } else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                }, function (err) {
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
                });
            }
        }

        function validPhone() {
            if(vm.phone !== ''){
                let phoneLength = vm.phone.toString().length;
                if(phoneLength > 5 && phoneLength < 12){
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone)
                    return false;
                }
            }
        }
        function validation() {
            if (vm.clinic.name === '' || vm.clinic.address === '' || vm.phone === ''){
                toastr.error(messagesSvc.error.emptyField);
                return false;
            } else {
                return true;
            }
        }
    }

})();