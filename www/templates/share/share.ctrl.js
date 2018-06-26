;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShareCtrl', ShareCtrl);

    ShareCtrl.$inject = ['$state', 'userSvc','textSvc'];

    function ShareCtrl( $state, userSvc, textSvc) {
        const vm = this;
        vm.share = share;
        vm.finish = finishReg;

        function finishReg() {
            if (userSvc.isDoc()) {
                $state.go('tabs.dentist-profile');
            } else if (userSvc.isPat()) {
                $state.go('tabs.patient-profile');
            }
        }

        function share() {
           textSvc.share();
        }
    }

})();