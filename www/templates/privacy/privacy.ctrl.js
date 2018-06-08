;(function () {
    'use string';

    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    PrivacyCtrl.$inject = [];

    function PrivacyCtrl() {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();