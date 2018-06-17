;(function () {
    'use string';

    angular
        .module('app')
        .controller('MyPatientCtrl', MyPatientCtrl);

    MyPatientCtrl.$inject = ['$ionicPopup', '$scope','$ionicHistory'];

    function MyPatientCtrl($ionicPopup, $scope, $ionicHistory) {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();