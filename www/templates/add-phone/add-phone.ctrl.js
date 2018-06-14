;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc', '$ionicPopup'];

    function AddPhoneCtrl($scope, $state, $localStorage, regSvc, toastr, messagesSvc, $ionicPopup) {
        const vm = this;
        vm.send = send;
        vm.selectNumberCode = selectNumberCode;
        vm.phone = '';
        vm.content = {
            val1: 'You will receive sms with code',
            val3: 'get me in',
            val4: '380',
            valBtn: 'Send'
        }

        function send() {
            if(validPhone()){
                let phone = vm.content.val4 + vm.phone;
                let send = {
                    phone: phone
                };
                regSvc.sendPhone(send).then(function (data) {
                    if(data.success) {
                        console.log(data.data)
                        toastr.success(data.message, '', {
                            onHidden: function () {
                                $state.go('add-code');
                            }
                        });
                        $localStorage.valView = false;
                        $localStorage.phone = phone;
                        vm.phone = '';
                    }else {
                        if(data.message){
                            toastr.error(data.message)
                        }
                    }
                });
            } else {
                toastr.error(messagesSvc.error.invalidPhone)
            }
        }
        function validPhone() {
            if(vm.phone !== ''){
                let phoneLength = vm.phone.toString().length;
                if(phoneLength > 5 && phoneLength < 12){
                    return true;
                } else {
                    return false;
                }
            }
        }
        function selectNumberCode() {
            $scope.data = {};
            $ionicPopup.show({
                template: '<input type="search" class="input-search" ng-model="vm.search">',
                title: 'Select country',
                scope: $scope,
                buttons: [
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                        }
                    }
                ]
            });
        }
    }

})();
