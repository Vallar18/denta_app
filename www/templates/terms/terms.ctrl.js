;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    TermsCtrl.$inject = ['$ionicHistory', 'textSvc'];

    function TermsCtrl($ionicHistory, textSvc) {
        const vm = this;
        init();

        function init() {
            textSvc.getTerms().then(function (res) {
                if(res){
                    vm.text_terms = res.description;
                }
            });
        }
        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();