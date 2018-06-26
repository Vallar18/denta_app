;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AddCodeCtrl', AddCodeCtrl);

    AddCodeCtrl.$inject = ['$state', 'regSvc', 'authSvc', 'userSvc', 'toastr', 'messagesSvc', 'dentistSvc', 'fcmSvc'];

    function AddCodeCtrl($state, regSvc, authSvc, userSvc, toastr, messagesSvc, dentistSvc, fcmSvc) {
        const vm = this;
        vm.send = send;
        vm.goAddPhone = goAddPhone;
        vm.phone = authSvc.getPhone();
        vm.code = '';
        vm.content = {
            val1: 'Didn\'t recived code',
            val2: 'click here',
            val3: 'get me in',
            valBtn: 'Send'
        };

        function send() {
            if (authSvc.isValidCode(vm.code)) {
                regSvc.sendVerify({
                    phone: vm.phone,
                    code: '' + vm.code
                }).then(function (data) {
                    progressVerifySuccess(data);
                }, function (err) {
                    processRegError(err);
                });
            } else {
                toastr.error(messagesSvc.error.invalidCode);
            }
        }

        function progressVerifySuccess(data) {
            if (data.success) {
                if (data.user && data.user.roles.length && data.token) {
                    processUserData(data);
                } else if(data.authKey) {
                    authSvc.setCode(vm.code + '');
                    authSvc.setKey(data.authKey);
                    vm.code = '';
                    checkDentistInvite();
                }
            } else {
                if (data.message) {
                    toastr.error(data.message);
                }
                if (data.success === false) {
                    $state.go('add-phone');
                }
            }
        }

        function processUserData(data){
            userSvc.setUser(data.user);
            userSvc.setRole(data.user.roles[0].name);
            userSvc.setToken(data.token);
            sendFCMToken();
            if (userSvc.isDoc()) {
                $state.go('tabs.dentist-profile');
            } else if (userSvc.isPat()) {
                $state.go('tabs.patient-profile');
            }
            vm.code = '';
        }

        function sendFCMToken() {
            fcmSvc.getToken(function (data) {
                fcmSvc.sendToken(data).then(function () {
                    fcmSvc.subscribe();
                });
            });
        }

        function checkDentistInvite() {
            dentistSvc.checkDentistInvite({
                phone: vm.phone
            }).then(function (res) {
                if (res && angular.isDefined(res.status)) {
                    if (res.status) {
                        userSvc.setRole(userSvc.roleConst().doctor);
                        $state.go('registration-dentist');
                    } else {
                        $state.go('select-role');
                    }
                }
            });
        }

        function processRegError(err) {
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
        }

        function goAddPhone() {
            vm.code = '';
            $state.go('add-phone');
        }
    }

})
();
