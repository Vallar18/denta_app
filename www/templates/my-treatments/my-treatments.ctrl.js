;(function () {
    'use string';

    angular
        .module('app')
        .controller('MyTreatmentsCtrl', MyTreatmentsCtrl);

    MyTreatmentsCtrl.$inject = ['$ionicPopup', '$scope','$ionicHistory'];

    function MyTreatmentsCtrl($ionicPopup, $scope, $ionicHistory) {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();