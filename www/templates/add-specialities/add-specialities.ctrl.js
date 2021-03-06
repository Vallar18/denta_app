;(function () {
        'use strict'

        angular
            .module('app')
            .controller('AddSpecialitiesCtrl', AddSpecialitiesCtrl);

        AddSpecialitiesCtrl.$inject = ['$scope', '$state', '$stateParams', 'utilsSvc', 'dentistSvc', 'authSvc', 'specSvc', 'toastr', 'userSvc', 'messagesSvc', '$ionicModal', 'spec', 'currencies', '$ionicPopup', 'currencySvc'];

        function AddSpecialitiesCtrl($scope, $state, $stateParams, utilsSvc, dentistSvc, authSvc, specSvc, toastr, userSvc, messagesSvc, $ionicModal, spec, currencies, $ionicPopup, currencySvc) {
            const vm = this;
            vm.send = send;
            vm.getSpeciality = getSpeciality;
            vm.saveModal = saveModal;
            vm.selectItem = selectItem;
            vm.getSelectCurrency = getSelectCurrency;
            vm.selectCurrency = selectCurrency;
            vm.sendBecomeDentist = sendBecomeDentist;
            vm.edit = $stateParams.edit;
            vm.become_den = $stateParams.become_den;
            vm.btn_text = 'Send';
            vm.user = userSvc.getUser();
            vm.role = userSvc.getRole();
            vm.specialities = spec;
            vm.currencies = currencies;
            vm.select_currency = vm.currencies[currencySvc.getDefaultIndex()];

            init();

            function init() {
                if (vm.edit) {
                    vm.btn_text = 'Update';
                    vm.select_currency = vm.user.dentist.currency;
                    vm.dentist = {
                        user_id: vm.user.id, role: vm.role, currency_id: vm.select_currency.id,
                        price: vm.user.dentist.price, description: vm.user.dentist.description,
                        specialty_id: [],
                    };
                    prepareSpec();
                    angular.forEach(vm.specialities, function (val) {
                        if (vm.specById[val.id]) {
                            val.checked = true;
                        }
                    });
                } else {
                    vm.dentist = {
                        user_id: vm.user.id, role: vm.role, currency_id: vm.select_currency.id,
                        price: '', description: '', specialty_id: [],
                    };
                }
            }

            authSvc.addBackBehave(vm.edit);

            function prepareSpec() {
                vm.specById = utilsSvc.createObjByArrayIds(vm.user.dentist.specialties);
                angular.forEach(vm.user.dentist.specialties, function (val) {
                    vm.dentist.specialty_id.push(val.id);
                    vm.len_spec = vm.dentist.specialty_id.length;
                });

            }

            function send() {
                if (validation('reg')) {
                    if (vm.edit) {
                        editProcess();
                    } else if (vm.become_den) {
                        sendBecomeDentist();
                    } else {
                        addSpecProcess();
                    }
                }
            }

            function sendBecomeDentist() {
                vm.become_dentist = {
                    user_id: vm.user.id,
                    avatar: vm.user.avatar,
                    specialty_id: vm.dentist.specialty_id,
                    description: vm.dentist.description,
                    price: vm.dentist.price
                };
                vm.become_dentist.currency_id = vm.select_currency.id;
                if (!validation('become')) return;
                dentistSvc.sendBecomeDen(vm.become_dentist).then(function (data) {
                    if (data.success) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            userSvc.setRole(res.user.dentist ? userSvc.roleConst().doctor : userSvc.roleConst().patient);
                            $state.go('tabs.my-patient');
                        });
                    } else {
                        if (data.message) {
                            toastr.error(data.message);
                        }
                    }
                }, function (err) {
                    let err_text = '';
                    angular.forEach(err, function (val, key) {
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

            function editProcess() {
                vm.dentist.currency_id = vm.select_currency.id;
                specSvc.updateSpeciality(vm.dentist).then(function (data) {
                    if (data.success) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            $state.go('tabs.dentist-profile');
                        });
                    } else {
                        if (data.message) {
                            toastr.error(data.message);
                        }
                    }
                }, function (err) {
                    let err_text = '';
                    angular.forEach(err, function (val, key) {
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

            function addSpecProcess() {
                vm.dentist.currency_id = vm.select_currency.id;
                specSvc.addSpeciality(vm.dentist).then(function (data) {
                    if (data.success) {
                        userSvc.setUser(data.data);
                        $state.go('share');
                    } else {
                        if (data.message) {
                            toastr.error(data.message);
                        }
                    }
                }, function (err) {
                    let err_text = '';
                    angular.forEach(err, function (val, key) {
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

            $ionicModal.fromTemplateUrl('components/speciality-select/speciality-select.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            function getSpeciality() {
                $scope.modal.show();
            }

            function selectItem(spec) {
                if (spec.checked === true) {
                    vm.dentist.specialty_id.push(spec.id);
                } else if (spec.checked === false) {
                    let spec_id = vm.dentist.specialty_id.indexOf(spec.id);
                    vm.dentist.specialty_id.splice(spec_id, 1);
                }
                vm.len_spec = vm.dentist.specialty_id.length;
            }

            function saveModal() {
                if (vm.dentist.specialty_id && vm.len_spec) {
                    $scope.modal.hide();
                } else {
                    toastr.error(messagesSvc.error.emptySpec);
                }
            }

            function validation(type) {
                if (type && type === 'reg') {
                    if (!vm.dentist.price || vm.dentist.price <= 0 || vm.dentist.price === '' || vm.dentist.description === '') {
                        toastr.error(messagesSvc.error.emptyField);
                        return false;
                    } else if (vm.len_spec <= 0) {
                        toastr.error(messagesSvc.error.emptySpec);
                        return false;
                    }
                } else if (type === 'become') {
                    if (!vm.become_dentist.user_id ||
                        !vm.become_dentist.avatar ||
                        !vm.become_dentist.specialty_id ||
                        !vm.become_dentist.description || !vm.become_dentist.description.length ||
                        !vm.become_dentist.price || vm.dentist.price <= 0 ||
                        !vm.become_dentist.currency_id) {
                        toastr.error(messagesSvc.error.emptyField);
                        return false;
                    }
                }
                return true;
            }

            function getSelectCurrency() {
                $scope.data = {};
                vm.currencyPopup = $ionicPopup.show({
                    templateUrl: 'components/select-currency/select-currency.html',
                    scope: $scope,
                    cssClass: 'select-currency-popup'
                });
            }

            function selectCurrency(currency) {
                vm.select_currency = currency;
                vm.currencyPopup.close();
            }
        }

    }

)();