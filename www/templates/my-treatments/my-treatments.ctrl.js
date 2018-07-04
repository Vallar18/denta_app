;(function () {
    'use strict';

    angular
        .module('app')
        .controller('MyTreatmentsCtrl', MyTreatmentsCtrl);

    MyTreatmentsCtrl.$inject = ['$ionicPopup', '$scope','$ionicHistory'];

    function MyTreatmentsCtrl($ionicPopup, $scope, $ionicHistory) {
        var vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();