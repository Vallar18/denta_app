;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$ionicPopup', '$scope','$ionicHistory'];

    function AboutCtrl($ionicPopup, $scope, $ionicHistory) {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();