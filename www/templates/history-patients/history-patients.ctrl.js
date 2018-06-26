;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HistoryPatientsCtlr', HistoryPatientsCtlr);

    HistoryPatientsCtlr.$inject = ['$ionicHistory', '$state', 'toastr', 'patientsItems'];

    function HistoryPatientsCtlr($ionicHistory, $state, toastr, patientsItems) {
        var vm = this;
        vm.historyItems = patientsItems;


    }
})();