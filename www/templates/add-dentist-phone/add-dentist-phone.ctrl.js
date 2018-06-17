;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc'];

    function AddDentistPhoneCtrl($state, $localStorage, regSvc, toastr, messagesSvc) {
        const vm = this;
        vm.send = send;
        vm.skipAddPhoneDentist = skipAddPhoneDentist;
        vm.hideOverlay = hideOverlay;
        vm.user = $localStorage.user;
        vm.role = $localStorage.role;
        vm.dentist_phone = '';
        vm.overlay = true;

        function send() {
            if(validPhoneDentist()){
                if (vm.user){
                    vm.data = {
                        user_id: vm.user.id,
                        dentist_phone: "+380" + vm.dentist_phone,
                        role: vm.role
                    };
                }
                regSvc.addRolePatient(vm.data).then(function (data) {
                    if(data.success) {
                        // toastr.success(data.message, '', {
                        //     onHidden: function () {
                                $state.go('share')
                            // }
                        // });
                        vm.dentist.phone = '';
                    } else {
                        $state.go('share')
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
        function hideOverlay() {
            vm.overlay = false;
        }

        function skipAddPhoneDentist() {
            $state.go('share')
        }

        function validPhoneDentist() {
            if (vm.dentist_phone !== '') {
                let phoneLength = vm.dentist_phone.toString().length;
                if (phoneLength > 5 && phoneLength < 12) {
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone)
                    return false;
                }
            }
        }
    }

})();