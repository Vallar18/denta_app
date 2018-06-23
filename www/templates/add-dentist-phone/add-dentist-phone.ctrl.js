;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrl.$inject = ['$scope', '$state', '$stateParams', 'regSvc', 'phoneSvc', 'codes', 'toastr', 'messagesSvc', '$ionicPlatform', '$cordovaContacts', 'userSvc','$ionicPopup','dentistSvc'];

    function AddDentistPhoneCtrl($scope, $state, $stateParams, regSvc, phoneSvc, codes, toastr, messagesSvc, $ionicPlatform, $cordovaContacts, userSvc, $ionicPopup, dentistSvc) {
        const vm = this;
        vm.send = send;
        vm.skip = skip;
        vm.hideOverlay = hideOverlay;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.pickContactUsingNativeUI = pickContactUsingNativeUI;
        vm.edit = $stateParams.edit;
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
            if(vm.edit){
                hideOverlay();
            }
        }

        function pickContactUsingNativeUI() {
            $ionicPlatform.ready(function () {
                $cordovaContacts.pickContact().then(function (contactPicked) {
                    if(contactPicked && contactPicked.phoneNumbers && contactPicked.phoneNumbers.length){
                        if(contactPicked.phoneNumbers.length > 1){
                            showSelectPhonePopup();
                        } else {
                            vm.phone = +contactPicked.phoneNumbers[0].value;
                        }
                    }
                    $scope.$evalAsync();
                }, function (error) {
                    toastr.error(messagesSvc.error.notGetContact);
                })
            });
        }

        function send() {
            if (validPhoneDentist()) {
                if (vm.user) {
                    var data = {
                        user_id: vm.user.id,
                        dentist_phone: vm.sum_phone,
                        role: vm.role
                    };
                    if(vm.edit){
                        updateRoleProcess(data);
                    } else{
                        addRoleProcess(data);
                    }
                }
            }
        }

        function addRoleProcess(data) {
            if(angular.isUndefined(data)){ return; }
            regSvc.addRolePatient(data).then(function (data) {
                if (data.success) {
                    $state.go('share');
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
            if(angular.isUndefined(data)){ return; }
            userSvc.updateUserRole(data).then(function (data) {
                if (data.success) {
                    userSvc.getUserInfo().then(function (res) {
                        userSvc.setUser(res.user);
                        $state.go('tabs.patient-profile');
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
                if(vm.edit){
                    updateRoleProcess(data);
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