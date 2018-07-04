;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HelpItemCtrl', HelpItemCtrl);

    HelpItemCtrl.$inject = ['$scope','$state'];

    function HelpItemCtrl($scope, $state) {
        var vm = this;

        vm.getInfo = function(dentistId){
            if(dentistId){
                $state.go('tabs.view-dentist-profile',{id: dentistId});
            }
        };
    }

})();