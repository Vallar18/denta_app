;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddClinicCtrl', AddClinicCtrl);

    AddClinicCtrl.$inject = ['$scope', '$state', '$stateParams', 'regSvc', 'phoneSvc', 'authSvc', 'toastr', 'messagesSvc', 'dentistSvc', 'codes', '$ionicPopup', 'geoSvc', '$ionicLoading', 'userSvc'];

    function AddClinicCtrl($scope, $state, $stateParams, regSvc, phoneSvc, authSvc, toastr, messagesSvc, dentistSvc, codes, $ionicPopup, geoSvc, $ionicLoading, userSvc) {
        const vm = this;
        vm.checkClinicPhone = checkClinicPhone;
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.validPhone = validPhone;
        vm.openMapPopup = openMapPopup;
        vm.newClinic = newClinic;
        vm.selectClinic = selectClinic;
        vm.edit = $stateParams.edit;
        vm.become_den = $stateParams.become_den;
        vm.codes = codes;
        vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = vm.selected_country.code;
        vm.user = userSvc.getUser();
        authSvc.addBackBehave(vm.edit);
        let clinic = userSvc.getUser().clinic;
        vm.phone = '';
        vm.btn_text = 'Send';
        if (vm.become_den) {
            vm.edit = false;
            authSvc.addBackBehave(vm.edit);
        }
        vm.clinic = {
            user_id: vm.user.id, name: '', phone: '',
            longitude: null, latitude: null
        };
        if (vm.edit) {
            vm.btn_text = 'Update';
            vm.clinic = {
                user_id: vm.user.id, name: clinic.name, phone: clinic.phone, address: clinic.address,
                longitude: clinic.longitude, latitude: clinic.latitude
            };
        }

        function checkClinicPhone() {
            if (!validPhone()) {
                return;
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
                title: messagesSvc.quest.clinicPhone,
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
                vm.clinic = vm.select_clinic;
                vm.change_clinic = {
                    user_id: vm.user.id, clinic_id: vm.clinic.id
                };
                vm.showSelect = true;
            } else {
                vm.showSelect = false;
            }
        }

        function selectClinic() {
            vm.clinic = vm.select_clinic;
            vm.change_clinic = {
                user_id: vm.user.id, clinic_id: vm.clinic.id
            };
        }

        function newClinic() {
            if (vm.edit) {
                vm.edit = false;
                vm.edit_spec = true;
                vm.btn_text = 'Send';
                vm.clinic = {
                    user_id: vm.user.id, name: '', phone: '',
                    longitude: null, latitude: null
                };
            }
        }

        function send() {
            if (!validation()) {
                return;
            }
            if (vm.edit) {
                updateClinic(vm.clinic);
            } else if (vm.showSelect) {
                changeClinic(vm.change_clinic);
            } else {
                createClinic(vm.clinic);
            }
        }

        function updateClinic(data) {
            vm.clinic.country_id = vm.selected_country.id;
            dentistSvc.updateClinic(data).then(function (data) {
                if (data.success) {
                    if (vm.become_den) {
                        $state.go('add-specialities', {edit: false, become_den: true});
                    } else {
                        $state.go('add-specialities', {edit: true});
                    }
                } else {
                    if (data.message) {
                        toastr.error(data.message);
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
                    if (vm.edit || vm.edit_spec || vm.become_den) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            if (vm.become_den) {
                                $state.go('add-specialities', {edit: false, become_den: true});
                            } else {
                                $state.go('add-specialities', {edit: true});
                            }
                        });
                    } else {
                        $state.go('add-specialities');
                    }
                } else {
                    if (data.message) {
                        toastr.error(data.message);
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
            vm.clinic.country_id = vm.selected_country.id;
            regSvc.createClinic(data).then(function (data) {
                if (data.success) {
                    if (vm.edit_spec || vm.become_den) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            if (vm.become_den) {
                                $state.go('add-specialities', {edit: false, become_den: true});
                            } else {
                                $state.go('add-specialities', {edit: true});
                            }
                        });
                    } else {
                        $state.go('add-specialities');
                    }
                } else {
                    if (data.message) {
                        toastr.error(data.message);
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
            } else if (vm.clinic.phone) {
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
                } else if (!vm.clinic.latitude || !vm.clinic.longitude) {
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
            vm.selected_country = code;
            vm.codePopup.close();
        }

        function openMapPopup() {
            if (vm.showSelect) {
                return;
            }
            var mapPopup = $ionicPopup.show({
                templateUrl: 'components/google-maps/google-maps.html',
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
            geoSvc.mapWithMarker();
        }

        function processMapPopupOK() {
            $ionicLoading.hide();
            $ionicLoading.show({
                template: 'Obtaining an address...'
            });
            geoSvc.getAddress(geoSvc.getMarkerPosition(), function (res) {
                if (res.address.length) {
                    vm.clinic.address = res.address;
                    vm.clinic.longitude = res.lng;
                    vm.clinic.latitude = res.lat;
                } else {
                    toastr.error(messagesSvc.error.emptyAddress);
                }
                $ionicLoading.hide();
            }, function () {
                toastr.error(messagesSvc.error.emptyAddress);
                $ionicLoading.hide();
            });
        }


        vm.disableTap = function (event) {
            let input = event.target;
            // Get the predictions element
            let container = document.getElementsByClassName('pac-container');
            container = angular.element(container);
            // Apply css to ensure the container overlays the other elements, and
            // events occur on the element not behind it
            container.css('z-index', '5000');
            container.css('pointer-events', 'auto');
            // Disable ionic data tap
            container.attr('data-tap-disabled', 'true');
            // Leave the input field if a prediction is chosen
            container.on('click', function () {
                input.blur();
            });
        };
    }

})();