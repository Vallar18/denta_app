;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$state', 'userSvc','textSvc'];

    function ShareCtrl( $state, userSvc, textSvc) {
        var vm = this;
        vm.share = share;
        vm.finish = finishReg;

        function finishReg() {
            if (userSvc.isDoc()) {
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