;(function () {
    'use string';

    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    TermsCtrl.$inject = [];

    function TermsCtrl() {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();