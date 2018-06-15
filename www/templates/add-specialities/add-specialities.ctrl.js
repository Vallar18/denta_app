;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddSpecialitiesCtrl', AddSpecialitiesCtrl);

    AddSpecialitiesCtrl.$inject = ['$scope', '$state', 'regSvc', 'toastr', '$localStorage', 'messagesSvc', '$ionicModal', 'spec', 'currencies', '$ionicPopup'];

    function AddSpecialitiesCtrl($scope, $state, regSvc, toastr, $localStorage, messagesSvc, $ionicModal, spec, currencies, $ionicPopup) {
        const vm = this;
        vm.send = send;
        vm.getCurrency = getCurrency;
        vm.getSpeciality = getSpeciality;
        vm.saveModal = saveModal;
        vm.selectItem = selectItem;
        vm.getSelectCurrency = getSelectCurrency;
        vm.selectCurrency = selectCurrency;
        // vm.closeModal = closeModal;
        vm.user = $localStorage.user;
        vm.role = $localStorage.role;
        vm.specialities = spec;
        vm.currencies = currencies;
        vm.select_currency = vm.currencies[221];
        vm.spec_selected_id = [];
        vm.price = '';
        vm.description = '';

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
            if(spec.checked === true){
                vm.spec_selected_id.push(spec.id);
            } else if(spec.checked === false){
                let spec_id = vm.spec_selected_id.indexOf(spec.id)
                vm.spec_selected_id.splice(spec_id, 1);
            }
            vm.len_spec = vm.spec_selected_id.length
        };
        function saveModal() {
            if (vm.spec_selected_id && vm.len_spec){
                $scope.modal.hide();
            } else {
                toastr.error(messagesSvc.error.emptySpec);
            }
        }
        function validation() {
            if (vm.price === '' || vm.description === ''){
                toastr.error(messagesSvc.error.emptyField);
                return false;
            } else if(vm.len_spec <= 0){
                toastr.error(messagesSvc.error.emptySpec);
                return false;
            } else {
                return true;
            }
        }
        function getSelectCurrency() {
            $scope.data = {};
            vm.currencyPopup = $ionicPopup.show({
                templateUrl: 'components/select-currency/select-currency.html',
                scope: $scope,
            });
        }
        function selectCurrency(currency) {
            vm.select_currency = currency;
            vm.currencyPopup.close();
        }
        // function closeModal() {
        //     vm.currencyPopup.close();
        // }
    }

})();