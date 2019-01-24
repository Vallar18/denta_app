;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$scope', '$state', '$stateParams', 'authSvc', 'regSvc', 'phoneSvc', 'codes', '$translate',
        'toastr', 'messagesSvc', '$ionicPlatform', '$cordovaContacts', 'userSvc', '$ionicPopup', 'dentistSvc'];

    function AddDentistPhoneCtrl($scope, $state, $stateParams, authSvc, regSvc, phoneSvc, codes, $translate,
                                 toastr, messagesSvc, $ionicPlatform, $cordovaContacts, userSvc, $ionicPopup, dentistSvc) {
        const vm = this;
        vm.send = send;
        vm.skip = skip;
        vm.hideOverlay = hideOverlay;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.pickContactUsingNativeUI = pickContactUsingNativeUI;
        vm.selectOneContact = selectOneContact;
        vm.checkKey = checkKey;
        vm.back = back;
        vm.edit = $stateParams.edit;
        vm.c_invite = $stateParams.c_invite;
        vm.invite_for_den = $stateParams.invite_for_den;
        vm.codes = codes;
        vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
        vm.select_code = vm.selected_country.code;
        vm.user = userSvc.getUser();
        vm.role = userSvc.getRole();
        vm.phone = '';
        vm.overlay = true;
        vm.phoneFromContact = '';
        vm.contactList = [];
        init();
        // getLoc();

        function init() {
            if (vm.c_invite || vm.invite_for_den) {
                authSvc.addBackBehave(true);
            } else {
                authSvc.addBackBehave(vm.edit);
            }
            if (vm.edit || vm.c_invite || vm.invite_for_den) {
                vm.show_back = true;
                hideOverlay();
            }
            $translate('CONTENT.BTN_POPUP_YES').then(function (text) {
                $scope.btn_yes = text;
            });
            $translate('CONTENT.BTN_POPUP_NO').then(function (text) {
                $scope.btn_no = text;
            });
            $translate('CONTENT.TEXT_SEND_DENTIST_INVITE_TITE').then(function (text) {
                $scope.text_title_invite  = text;
            });
            $translate('CONTENT.TEXT_SEND_INVITE').then(function (text) {
                $scope.send_invite = text;
            });
        }

        // function getLoc() {
        //     $.getJSON("http://ip-api.com/json/?callback=?", function (data) {
        //         phoneSvc.setDefaultCountry(data.country);
        //         vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
        //         vm.select_code = vm.selected_country.code;
        //     });
        // }

        function back() {
            window.history.back();
        }

        function checkKey(event) {
            if (event.which === 13) {
                send()
            }
        }

        function pickContactUsingNativeUI() {
            $ionicPlatform.ready(function () {
                $cordovaContacts.pickContact().then(function (contactPicked) {
                    if (contactPicked && contactPicked.phoneNumbers && contactPicked.phoneNumbers.length) {
                        if (contactPicked.phoneNumbers.length > 1) {
                            vm.contactList = contactPicked.phoneNumbers;
                            showSelectPhonePopup();
                        } else {
                            vm.phone = phoneSvc.clearPhone(contactPicked.phoneNumbers[0].value);
                            toastr.warning(messagesSvc.warning.checkCodePhone);
                        }
                    }
                    $scope.$evalAsync();
                }, function (error) {
                    toastr.error(messagesSvc.error.notGetContact);
                });
            });
        }

        function showSelectPhonePopup() {
            vm.show_select_phone_popup = $ionicPopup.show({
                templateUrl: 'components/select-contact/select-contact.html',
                title: messagesSvc.quest.number,
                scope: $scope,
            });
        }

        function selectOneContact(c_item) {
            vm.phone = phoneSvc.clearPhone(c_item.value);
            vm.show_select_phone_popup.close();
            toastr.warning(messagesSvc.warning.checkCodePhone);
        }

        function send() {
            if (validPhoneDentist()) {
                if (vm.user) {
                    var data = {
                        user_id: vm.user.id,
                        dentist_phone: vm.sum_phone,
                        role: vm.role
                    };
                    if (vm.edit || vm.c_invite) {
                        updateRoleProcess(data);
                    } else if (vm.invite_for_den) {
                        data = {
                            dentist_phone: vm.sum_phone,
                        };
                        inviteForDentist(data);
                    } else {
                        addRoleProcess(data);
                    }
                }
            }
        }

        function addRoleProcess(data) {
            if (angular.isUndefined(data)) {
                return;
            }
            regSvc.addRolePatient(data).then(function (res) {
                if (res.success) {
                    userSvc.getUserInfo().then(function (result) {
                        if (result.user) {
                            userSvc.setUser(result.user);
                            $state.go('share');
                        }
                    });
                } else {
                    showAskDentist();
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

        function inviteForDentist(data) {
            if (angular.isUndefined(data)) {
                return;
            }
            dentistSvc.addInviteDentist(data).then(function (data) {
                if (data.success) {
                    userSvc.getUserInfo().then(function (res) {
                        userSvc.setUser(res.user);
                        $state.go('tabs.dentist-profile');
                        vm.phone = '';
                    });
                } else {
                    showAskDentist();
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

        function updateRoleProcess(data) {
            if (angular.isUndefined(data)) {
                return;
            }
            userSvc.updateUserRole(data).then(function (data) {
                if (data.success) {
                    userSvc.getUserInfo().then(function (res) {
                        userSvc.setUser(res.user);
                        $state.go('tabs.patient-profile');
                        vm.phone = '';
                    })
                } else {
                    showAskDentist();
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

        function hideOverlay() {
            vm.overlay = false;
        }

        function skip() {
            if (vm.user) {
                var data = {
                    user_id: vm.user.id,
                    role: vm.role
                };
                if (vm.edit || vm.c_invite) {
                    updateRoleProcess(data);
                } else if (vm.invite_for_den) {
                    $state.go('tabs.dentist-profile');
                } else {
                    addRoleProcess(data);
                }
            }
        }

        function validPhoneDentist() {
            if (vm.phone !== '') {
                vm.sum_phone = vm.select_code + vm.phone;
                var len_phone = vm.sum_phone.toString().length;
                if (len_phone > 8 && len_phone < 20) {
                    return true;
                } else {
                    toastr.error(messagesSvc.error.invalidPhone);
                    return false;
                }
            }
        }

        function getSelectCode(event) {
            if (event.which) {
                event.preventDefault();
            } else {
                $scope.data = {};
                vm.codePopup = phoneSvc.showSelect($scope);
            }
        }

        function selectCode(code) {
            vm.select_code = code.code;
            vm.codePopup.close();
        }


        function showAskDentist() {
            $ionicPopup.show({
                template: $scope.text_title_invite ||  'This dentist is not in our database, send him an invitation?',
                title:  $scope.send_invite || 'Send invite',
                scope: $scope,
                buttons: [
                    {
                        text: $scope.btn_no || 'NO',
                        onTap: function () {
                            skip();
                        }
                    },
                    {
                        text: '<b>'+$scope.btn_yes+'</b>' || '<b>YES</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            dentistSvc.invite({
                                dentist_phone: vm.sum_phone,
                                patient_phone: vm.user.phone
                            }).then(function (res) {
                                skip();
                            });
                        }
                    }
                ]
            });
        }
    }
})();