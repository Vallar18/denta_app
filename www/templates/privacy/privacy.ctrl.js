;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    PrivacyCtrl.$inject = ['$ionicHistory'];

    function PrivacyCtrl($ionicHistory) {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();