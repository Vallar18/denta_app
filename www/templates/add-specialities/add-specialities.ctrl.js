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
        vm.saveModal = saveModal;
        vm.selectItem = selectItem;
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
                        specialty_id: vm.spec_selected_id,
                        description: vm.description,
                        price: vm.price,
                    };
                }
                regSvc.addSpeciality(vm.data).then(function (data) {
                    if(data.success) {
                        // toastr.success(data.message, '', {
                        //     onHidden: function () {
                                $state.go('share')
                        //     }
                        // });
                        vm.price = '';
                        vm.description = '';
                        vm.spec_selected_id = [];
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
        $ionicModal.fromTemplateUrl('components/edit-specialities/edit-specialities.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        function getSpeciality() {
            vm.specialities = [];
            regSvc.getSpeciality()
                .then(function (res) {
                    vm.specialities = res;
                    $scope.modal.show();
            });
        }
        vm.spec_selected_id = [];
        function selectItem(spec) {
            if(spec.checked === true){
                vm.spec_selected_id.push(spec.id);
            } else if(spec.checked === false){
                var spec_id = vm.spec_selected_id.indexOf(spec.id)
                vm.spec_selected_id.splice(spec_id, 1)
            }
            console.log(vm.spec_selected_id)
        }
        function saveModal() {
            if (vm.spec_selected_id && vm.spec_selected_id.length){
                $scope.modal.hide();
            } else {
                toastr.error(messagesSvc.error.emptySpec);
            }
        }
        function validation() {
            if (vm.price === '' || vm.description === ''){
                toastr.error(messagesSvc.error.emptyField);
                return false;
            } else if(vm.spec_selected_id.length <= 0){
                toastr.error(messagesSvc.error.emptySpec);
                return false;
            } else {
                return true;
            }
        }
    }

})();