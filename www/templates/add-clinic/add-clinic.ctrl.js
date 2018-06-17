;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$scope', '$state', 'regSvc', 'toastr', 'messagesSvc', '$localStorage', 'codes', '$ionicPopup'];

    function AddClinicCtrl($scope, $state, regSvc, toastr, messagesSvc, $localStorage, codes, $ionicPopup) {
        const vm = this;
        vm.checkClinicPhone = checkClinicPhone;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.validPhone = validPhone;
        vm.codes = codes;
        vm.select_code = vm.codes[235].code;
        vm.user = $localStorage.user;
        vm.phone = '';
        vm.clinic = {
            user_id: vm.user.id,
            name: '',
            phone: '',
            address: '',
            longitude: 30.5238,
            latitude: 50.45466
        }

        function checkClinicPhone() {
            if(validPhone()){
                let send = {
                    phone: vm.clinic.phone
                };
                regSvc.sendClinicPhone(send).then(function (data) {
                    if(data.success) {
                        toastr.success(messagesSvc.error.selectClinicName);
                        console.log(data.data[0])
                    } else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                });
            }
        }

        function send() {
            if(validation()){
                regSvc.createClinic(vm.clinic).then(function (data) {
                    if(data.success) {
                        // toastr.success(data.message, '', {
                        //     onHidden: function () {
                                $state.go('add-specialities')
                        //     }
                        // });
                        vm.clinic.name = '';
                        vm.clinic.address = '';
                        vm.phone = '';

                    } else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                }, function (err) {
                    var err_text = '';
                    angular.forEach(err, function (val) {
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
                // vm.code = vm.select_code.toString().slice(1);
                vm.clinic.phone = vm.select_code + vm.phone;
                vm.len_phone = vm.clinic.phone.length;
                if( vm.len_phone > 8 &&  vm.len_phone < 20  ){
                    vm.show_clinic = true;
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone);
                    vm.show_clinic = false;
                    return false;
                }
            }
        }
        function validation() {
            if(validPhone()){
                if (vm.clinic.name === '' || vm.clinic.address === ''){
                    toastr.error(messagesSvc.error.emptyField);
                    return false;
                } else {
                    return true;
                }
            }
        }
        function getSelectCode() {
            $scope.data = {};
            vm.codePopup = $ionicPopup.show({
                templateUrl: 'components/code-select/code-select.html',
                scope: $scope,
            });
        }
        function selectCode(code) {
            vm.select_code = code.code;
            vm.codePopup.close();
        }
    }

})();