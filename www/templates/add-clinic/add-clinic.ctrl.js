;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$scope', '$state', '$stateParams', 'regSvc', 'phoneSvc', 'toastr', 'messagesSvc', 'dentistSvc', 'codes', '$ionicPopup', 'geoSvc', '$ionicLoading', 'userSvc'];

    function AddClinicCtrl($scope, $state, $stateParams, regSvc, phoneSvc, toastr, messagesSvc, dentistSvc, codes, $ionicPopup, geoSvc, $ionicLoading, userSvc) {
        const vm = this;
        vm.checkClinicPhone = checkClinicPhone;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.validPhone = validPhone;
        vm.openMapPopup = openMapPopup;
        vm.newClinic = newClinic;
        vm.btn_text = 'Send';
        vm.edit = $stateParams.edit;
        vm.codes = codes;
        vm.select_code = vm.codes[phoneSvc.getDefaultIndex()].code;
        vm.user = userSvc.getUser();
        let clinic = userSvc.getUser().clinic
        vm.phone = '';
        if (vm.edit){
            vm.btn_text = 'Update';
            vm.clinic = {
                user_id: vm.user.id, name: clinic.name, phone: clinic.phone, address: clinic.address,
                longitude: clinic.longitude, latitude: clinic.latitude
            }
            return
        }
        vm.clinic = {
            user_id: vm.user.id, name: '', phone: '',
            longitude: null, latitude: null
        };
        
        /*$scope.listClinic = [
            {name: "Nacccccme"},
            {name: "Namcccccccccccccfffffffffffffffffffffffffffffffffffffffdhdhe"},
            {name: "Nabfgcme"},
            {name: "Nambcccccccccce"},
            {name: "Namcvvbcbcbce"},
        ]*/


        function checkClinicPhone() {
            if (!validPhone()) {
                return
            }
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

        function showPopUp() {
            $ionicPopup.show({
                title: 'The clinic with this phone number has already existed. Would you like to use this data?',
                scope: $scope,
                buttons: [
                    {text: 'No'},
                    {
                        text: '<b>Yes</b>',
                        type: 'button-positive',
                        onTap: getListClinic
                    },

                ]
            });
        }

        function getListClinic() {
            if (vm.listClinic && vm.listClinic.length) {
                vm.select_clinic = vm.listClinic[0];
                vm.clinic = {
                    name: vm.select_clinic.name,
                    address: vm.select_clinic.address,
                    latitude: vm.select_clinic.latitude,
                    longitude: vm.select_clinic.longitude
                };
                vm.change_clinic = {
                    user_id: vm.user.id, clinic_id: vm.select_clinic.id
                };
                vm.showSelect = true;
            } else {
                vm.showSelect = false;
            }
        }

        function newClinic() {
            if(vm.edit){
                vm.edit = false;
                vm.btn_text = 'Send';
                vm.clinic = {
                    user_id: vm.user.id, name: '', phone: '',
                    longitude: null, latitude: null
                };
                $state.reload();
            }
        }

        function send() {
            if (!validation()) {
                return
            }
            if(vm.edit){
                updateClinic(vm.clinic);
            } else if(vm.showSelect){
                changeClinic(vm.change_clinic)
            } else{
                createClinic(vm.clinic)
            }
        }

        function updateClinic(data) {
            dentistSvc.updateClinic(data).then(function (data) {
                if (data.success) {
                    $state.go('add-specialities', {edit: true});
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

        function changeClinic(data) {
            regSvc.changeClinic(data).then(function (data) {
                if (data.success) {
                    if(vm.edit){
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            $state.go('add-specialities', {edit: true});
                        });
                    } else {
                        $state.go('add-specialities');
                    }
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

        function createClinic(data) {
            regSvc.createClinic(data).then(function (data) {
                if (data.success) {
                    $state.go('add-specialities');
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
            } else if(vm.clinic.phone){
                vm.len_phone = vm.clinic.phone.length;
                if (vm.len_phone > 8 && vm.len_phone < 20) {
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone);
                    return false;
                }
            }
        }

        function validation() {
            if (validPhone()) {
                if (vm.clinic.name === '' || vm.clinic.address === '') {
                    toastr.error(messagesSvc.error.emptyField);
                    return false;
                } else if( !vm.clinic.latitude || !vm.clinic.longitude){
                    toastr.error(messagesSvc.error.checkClinickOnMap);
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
            if(vm.showSelect){
                return;
            }
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
                        onTap: processMapPopupOK
                    }
                ]
            });
            geoSvc.init();
        }

        function processMapPopupOK(){
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

})();