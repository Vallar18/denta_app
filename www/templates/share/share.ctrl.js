;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$state', 'userSvc', 'textSvc', 'dentistSvc'];

    function ShareCtrl($state, userSvc, textSvc, dentistSvc) {
        const vm = this;
        vm.share = share;
        vm.finish = finishReg;

        function finishReg() {
            if (userSvc.isDoc()) {
                dentistSvc.selectSubctipitonPlan();
                $state.go('tabs.my-patient');
            } else if (userSvc.isPat()) {
                $state.go('tabs.help');
            }
        }

        function share() {
            textSvc.getShare();
        }
    }

})();