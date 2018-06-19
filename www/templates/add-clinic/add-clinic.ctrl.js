;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$scope', '$state', 'regSvc', 'phoneSvc', 'toastr', 'messagesSvc', '$localStorage', 'codes', '$ionicPopup', 'geoSvc', '$ionicLoading', 'userSvc'];

    function AddClinicCtrl($scope, $state, regSvc, phoneSvc, toastr, messagesSvc, $localStorage, codes, $ionicPopup, geoSvc, $ionicLoading, userSvc) {
        const vm = this;
        vm.checkClinicPhone = checkClinicPhone;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.validPhone = validPhone;
        vm.openMapPopup = openMapPopup;
        vm.codes = codes;
        vm.select_code = vm.codes[235].code;
        vm.user = userSvc.getUser();
        vm.phone = '';
        vm.clinic = {
            user_id: vm.user.id,
            name: '',
            phone: '',
            longitude: null,
            latitude: null
        };

        function checkClinicPhone() {
            if (validPhone()) {
                let send = {
                    phone: vm.clinic.phone
                };
                regSvc.sendClinicPhone(send).then(function (data) {
                    if (data.success) {
                        showPopUp();
                        vm.listClinic = data.data;
                    } else {
                        if (data.message) {
                            // toastr.error(data.message)
                        }
                    }
                });
            }
        }

        function showPopUp() {
            $ionicPopup.show({
                title: 'This clinic already exists. <br> Use this data base',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Yes</b>',
                        type: 'button-positive',
                        onTap: getListClinic
                    },
                    {text: 'No'}
                ]
            });
        }

        function getListClinic() {
            if (vm.listClinic && vm.listClinic.length) {
                vm.select_clinic = vm.listClinic[0];
                vm.clinic.name = vm.select_clinic.name;
                vm.clinic.latitude = vm.select_clinic.latitude;
                vm.clinic.longitude = vm.select_clinic.longitude;
                vm.showSelect = true;
            } else {
                vm.showSelect = false;
            }
        }

        function send() {
            if (validation()) {
                regSvc.createClinic(vm.clinic).then(function (data) {
                    if (data.success) {
                        // toastr.success(data.message, '', {
                        //     onHidden: function () {
                        $state.go('add-specialities')
                        //     }
                        // });
                        vm.clinic.name = '';
                        vm.clinic.address = '';
                        vm.phone = '';

                    } else {
                        if (data.message) {
                            toastr.error(data.message)
                        }
                    }
                }, function (err) {
                    let err_text = '';
                    angular.forEach(err, function (val) {
                        if (angular.isArray(val)) {
                            err_text += val.reduce(function (acc, current) {
                                return acc + '\n' + current;
                            }, '');
                        }
                    });
                    if (err_text.length) {
                        toastr.error(err_text);
                    }
                });
            }
        }

        function validPhone() {
            if (vm.phone !== '') {
                vm.clinic.phone = vm.select_code + vm.phone;
                vm.len_phone = vm.clinic.phone.length;
                if (vm.len_phone > 8 && vm.len_phone < 20) {
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
            if (validPhone()) {
                if (vm.clinic.name === '' || vm.clinic.address === '' ||
                    !vm.clinic.latitude || !vm.clinic.longitude ) {
                    toastr.error(messagesSvc.error.emptyField);
                    return false;
                } else {
                    return true;
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

        function openMapPopup() {
            var mapPopup = $ionicPopup.show({
                templateUrl: 'components/google-maps/google-maps.html',
                title: 'Google maps',
                scope: $scope,
                cssClass: 'google-maps-component',
                buttons: [
                    {
                        text: 'Cancel',
                        onTap: function () {
                            $ionicLoading.hide();
                        }
                    },
                    {
                        text: '<b>OK</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            $ionicLoading.hide();
                            $ionicLoading.show({
                                template:'Obtaining an address...'
                            });
                            geoSvc.getAddress(geoSvc.getMarkerPosition(), function (res) {
                                if (res.address.length) {
                                    vm.clinic.address = res.address;
                                } else {
                                    toastr.error(messagesSvc.error.emptyAddress);
                                }
                                vm.clinic.longitude = res.lng;
                                vm.clinic.latitude = res.lat;
                                $ionicLoading.hide();
                            });
                        }
                    }
                ]
            });
            geoSvc.init();
        }
    }

})();