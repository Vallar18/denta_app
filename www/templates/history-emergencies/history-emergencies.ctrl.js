;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HistoryEmergenciesCtlr', HistoryEmergenciesCtlr);

    HistoryEmergenciesCtlr.$inject = ['$ionicHistory','$state','toastr'];

    function HistoryEmergenciesCtlr($ionicHistory, $state, toastr) {
        var vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };

        vm.historyItems = [];

        // vm.historyItems = [
        //     {
        //         id: 1,
        //         date: '1.06.2018',
        //         price: '280.9',
        //         isNotified: false,
        //         dentist: 'Dr House',
        //         country: 'Israel',
        //         needReview: false,
        //         isFiles: false,
        //         canNotify: false
        //     },
        //     {
        //         id: 2,
        //         date: '2.06.2018',
        //         price: '2.9',
        //         isNotified: false,
        //         needReview: true,
        //         dentist: 'Dr House 2',
        //         country: 'Israel',
        //         isFiles: false,
        //         canNotify: false
        //     },
        //     {
        //         id: 3,
        //         date: '03.10.2018',
        //         price: '28.0',
        //         isNotified: false,
        //         dentist: 'Dr House 3',
        //         country: 'Israel',
        //         needReview: false,
        //         isFiles: true,
        //         canNotify: true
        //     },
        // ];
    }
})();