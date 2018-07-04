;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$scope', '$state', '$stateParams', 'authSvc', 'regSvc', 'phoneSvc', 'codes', 'toastr', 'messagesSvc', '$ionicPlatform', '$cordovaContacts', 'userSvc','$ionicPopup','dentistSvc'];

    function AddDentistPhoneCtrl($scope, $state, $stateParams, authSvc, regSvc, phoneSvc, codes, toastr, messagesSvc, $ionicPlatform, $cordovaContacts, userSvc, $ionicPopup, dentistSvc) {
        var vm = this;
        vm.send = send;
        vm.skip = skip;
        vm.hideOverlay = hideOverlay;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.pickContactUsingNativeUI = pickContactUsingNativeUI;
        vm.selectOneContact = selectOneContact;
        vm.edit = $stateParams.edit;
        vm.c_invite = $stateParams.c_invite;
        vm.invite_for_den = $stateParams.invite_for_den;
        vm.codes = codes;
        vm.select_code = vm.codes[phoneSvc.getDefaultIndex()].code;
        vm.user = userSvc.getUser();
        vm.role = userSvc.getRole();
        vm.phone = '';
        vm.overlay = true;
        vm.phoneFromContact = '';
        vm.contactList = [];
        init();
        function init() {
            if(vm.c_invite || vm.invite_for_den){
                authSvc.addBackBehave(true);
            } else {
                authSvc.addBackBehave(vm.edit);
            }
            if(vm.edit || vm.c_invite || vm.invite_for_den){
                hideOverlay();
            }
        }
        function pickContactUsingNativeUI() {
            $ionicPlatform.ready(function () {
                $cordovaContacts.pickContact().then(function (contactPicked) {
                    if(contactPicked && contactPicked.phoneNumbers && contactPicked.phoneNumbers.length){
                        if(contactPicked.phoneNumbers.length > 1){
                            vm.contactList = contactPicked.phoneNumbers;
                            showSelectPhonePopup();
                        } else {
                            vm.phone = +contactPicked.phoneNumbers[0].value;
                            toastr.warning(messagesSvc.warning.checkCodePhone)
                        }
                    }
                    $scope.$evalAsync();
                }, function (error) {
                    toastr.error(messagesSvc.error.notGetContact);
                })
            });
        }

        function showSelectPhonePopup() {
            vm.show_select_phone_popup = $ionicPopup.show({
                templateUrl: 'components/select-contact/select-contact.html',
                title: 'Which number of your doctor would you like to choose?',
                scope: $scope,
            });
        }

        function selectOneContact(c_item) {
            vm.phone = phoneSvc.cutNumberCode(c_item.value, vm.codes);
            vm.show_select_phone_popup.close();
            toastr.warning(messagesSvc.warning.checkCodePhone)
        }

        function send() {
            if (validPhoneDentist()) {
                if (vm.user) {
                    var data = {
                        user_id: vm.user.id,
                        dentist_phone: vm.sum_phone,
                        role: vm.role
                    };
                    if(vm.edit || vm.c_invite){
                        updateRoleProcess(data);
                    } else if(vm.invite_for_den) {
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
            if(angular.isUndefined(data)){ return; }
            regSvc.addRolePatient(data).then(function (data) {
                if (data.success) {
                    userSvc.getUserInfo().then(function (res) {
                        userSvc.setUser(res.user);
                        $state.go('share');
                    })
                } else {
                   showAskDentist();
                }
            }, function (err) {
                var err_text = '';
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
            if(angular.isUndefined(data)){ return; }
            dentistSvc.addInviteDentist(data).then(function (data) {
                if (data.success) {
                    userSvc.getUserInfo().then(function (res) {
                        userSvc.setUser(res.user);
                        $state.go('tabs.dentist-profile');
                        vm.phone = '';
                    })
                } else {
                    showAskDentist();
                }
            }, function (err) {
                var err_text = '';
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
            if(angular.isUndefined(data)){ return; }
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
                var err_text = '';
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
                if(vm.edit || vm.c_invite){
                    updateRoleProcess(data);
                } else if(vm.invite_for_den){
                    $state.go('tabs.dentist-profile');
                } else{
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

        function getSelectCode() {
            $scope.data = {};
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            vm.codePopup.close();
        }


        function showAskDentist(){
            $ionicPopup.show({
                template: 'This dentist is not in our database, send him an invitation?',
                title: 'Send invite',
                scope: $scope,
                buttons: [
                    { text: 'NO',
                        onTap: function(){
                            skip();
                        }},
                    {
                        text: '<b>YES</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            dentistSvc.invite({
                                dentist_phone: vm.sum_phone,
                                patient_phone: vm.user.phone
                            }).then(function(res){
                                skip();
                            });
                        }
                    }
                ]
            });
        }


    }

})();