;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TermsCtrl', TermsCtrl);

    TermsCtrl.$inject = ['$ionicHistory', 'textSvc', '$translate'];

    function TermsCtrl($ionicHistory, textSvc, $translate) {
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