;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddSpecialitiesCtrl', AddSpecialitiesCtrl);

    AddSpecialitiesCtrl.$inject = ['$scope', '$state', 'regSvc', 'toastr', '$localStorage', 'messagesSvc', '$ionicModal'];

    function AddSpecialitiesCtrl($scope, $state, regSvc, toastr, $localStorage, messagesSvc, $ionicModal) {
        const vm = this;
        vm.send = send;
        vm.getCurrency = getCurrency;
        vm.getSpeciality = getSpeciality;
        vm.user = $localStorage.user;
        vm.role = $localStorage.role;
        vm.price = '';
        vm.description = '';
        vm.currency = {
            text: 'US Dollar - USD',
            id: 1
        };

        function send() {
            if(validation()){
                if (vm.user){
                    vm.data = {
                        user_id: vm.user.id,
                        role: vm.role,
                        currency_id: vm.currency.id,
                        speciality_id: vm.speciality.id,
                        description: vm.description,
                        price: vm.price,
                    };
                }
                regSvc.addSpeciality(vm.data).then(function (data) {
                    if(data.success) {
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('share')
                            }
                        });
                    } else {
                        if(data.message) {
                            toastr.error(data.message);
                        }
                    }
                }, function (err) {
                    var err_text = '';
                    angular.forEach(err, function (val, key) {
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
        function getCurrency() {
            vm.currency ={
                text: 'Euro',
                id: 2
            };
        }
        function getSpeciality() {
            vm.specialities = [];
            regSvc.getSpeciality()
                .then(function (res) {
                    vm.specialities =  res;
                    $ionicModal.fromTemplateUrl('edit-specialities.html', {
                        scope: $scope,
                    }).then(function (modal) {
                        $scope.model = modal;
                    });
                    $scope.openModal = function () {
                        $scope.modal.show();
                    }
            });
        }
        function validation() {
            if (vm.price === '' || vm.description === ''){
                toastr.error(messagesSvc.error.emptyField);
                return false;
            } else {
                return true;
            }
        }
    }

})();