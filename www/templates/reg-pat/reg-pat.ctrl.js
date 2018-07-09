;(function () {
    'use string'

    angular
        .module('app')
        .controller('RegPatCtrl', RegPatCtrl);

    RegPatCtrl.$inject = ['$state', '$stateParams', 'regSvc', 'authSvc', 'toastr', '$localStorage', 'messagesSvc', 'userSvc'];

    function RegPatCtrl($state, $stateParams, regSvc, authSvc, toastr, $localStorage, messagesSvc, userSvc) {
        const vm = this;
        vm.send = send;
        vm.phone = authSvc.getPhone();
        vm.key = authSvc.getKey();
        vm.edit = $stateParams.edit;
        vm.croppedDataUrl = '';
        if (vm.edit) {
            let user = userSvc.getUser();
            vm.user = {
                user_id: user.id, name: user.name,
                lastname: user.lastname, email: user.email
            };
        } else {
            vm.user = {
                name: '', lastname: '', email: '',
                phone: vm.phone, key: vm.key,
            };
        }

        authSvc.addBackBehave(vm.edit);

        function send() {
            if (!validation()) {
                return;
            }
            vm.user.country_id = authSvc.getCountryId();
            if (vm.edit) {
                userSvc.updateUser(vm.user).then(function (data) {
                    if (data.success) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            $state.go('tabs.patient-profile');
                        });
                    } else {
                        toastr.error(data.message);
                    }
                }, function (err) {
                    processRegError(err);
                });
            } else {
                regSvc.sendUser(vm.user).then(function (data) {
                    processRegSuccess(data);
                }, function (err) {
                    processRegError(err);
                });
            }
        }

        function processRegSuccess(data) {
            if (data.success) {
                userSvc.setUser(data.user);
                userSvc.setToken(data.token);
                $state.go('add-dentist-phone');
            } else {
                toastr.error(data.message);
            }
        }

        function processRegError(err) {
            if (err.phone && angular.isArray(err.phone)) {
                toastr.error(err.phone.reduce(function (acc, current) {
                    return acc + '\n' + current;
                }, ''))
            }
        }

        function validation() {
            if (vm.user.email === undefined) {
                toastr.error(messagesSvc.error.invalidEmail);
                return false
            }
            if (vm.user.name === '' || vm.user.lastname === '') {
                toastr.error(messagesSvc.error.emptyField);
                return false;
            }
            return true;
        }

    }

})();