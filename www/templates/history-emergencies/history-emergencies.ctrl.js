;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HistoryEmergenciesCtlr', HistoryEmergenciesCtlr);

    HistoryEmergenciesCtlr.$inject = ['$ionicHistory','$state','toastr','emergItems'];

    function HistoryEmergenciesCtlr($ionicHistory, $state, toastr,emergItems) {
        var vm = this;

        vm.historyItems = emergItems;
    }
})();