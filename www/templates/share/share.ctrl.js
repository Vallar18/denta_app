;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$state', 'userSvc', 'textSvc', 'purchaseSvc'];

    function ShareCtrl($state, userSvc, textSvc, purchaseSvc) {
        const vm = this;
        vm.share = share;
        vm.finish = finishReg;

        function finishReg() {
            if (userSvc.isDoc()) {
                purchaseSvc.selectSubcriptionPlan(function(){
                    $state.go('tabs.my-patient');
                });
            } else if (userSvc.isPat()) {
                $state.go('tabs.help');
            }
        }

        function share() {
            textSvc.getShare();
        }
    }

})();