;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HistoryCtrl', HistoryCtrl);

    HistoryCtrl.$inject = ['$ionicHistory', '$state', 'toastr', 'emergItems', 'emergenciesSvc'];

    function HistoryCtrl($ionicHistory, $state, toastr, emergItems, emergenciesSvc) {
        var vm = this;
        vm.back = function () {
            $ionicHistory.goBack();
        };
        vm.historyItems = emergItems;

        vm.goReview = function (item) {
            $state.go('send-review', {emergencyId: item.id});
        };

        vm.notify = function (item) {
            if (!item && !item.id) return;
            emergenciesSvc.activate({
                emergency_id: +item.id
            }).then(function (res) {
                if (res && res.success) {
                    toastr.success('Your home doctor will be notified');
                    item.status = 1;
                } else if (res && !res.success && res.message) {
                    toastr.error(res.message);
                }
            })
        };

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