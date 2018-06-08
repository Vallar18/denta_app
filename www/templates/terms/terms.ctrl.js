;(function () {
    'use string';

    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    TermsCtrl.$inject = ['$ionicHistory'];

    function TermsCtrl($ionicHistory) {
        const vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();