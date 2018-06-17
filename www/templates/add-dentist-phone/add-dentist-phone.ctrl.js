;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$scope', '$state', '$localStorage', 'regSvc', 'phoneSvc', 'codes', 'toastr', 'messagesSvc'];

    function AddDentistPhoneCtrl($scope, $state, $localStorage, regSvc, phoneSvc, codes, toastr, messagesSvc) {
        const vm = this;
        vm.send = send;
        vm.skipAddPhoneDentist = skipAddPhoneDentist;
        vm.hideOverlay = hideOverlay;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.codes = codes;
        vm.select_code = vm.codes[235].code;
        vm.user = $localStorage.user;
        vm.role = $localStorage.role;
        vm.phone = '';
        vm.overlay = true;

        function send() {
            if(validPhoneDentist()){
                if (vm.user){
                    vm.data = {
                        user_id: vm.user.id,
                        dentist_phone: vm.sum_phone,
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
                    let err_text = '';
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
                vm.sum_phone = vm.select_code + vm.phone;
                vm.len_phone = vm.sum_phone.toString().length;
                if (vm.len_phone > 8 && vm.len_phone < 20) {
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone)
                    return false;
                }
            }
        }
        function getSelectCode() {
            $scope.data = {};
            vm.codePopup = phoneSvc.showSelect($scope);
        }
        function selectCode(code) {
            vm.select_code = code.code;
            vm.codePopup.close();
        }
    }

})();