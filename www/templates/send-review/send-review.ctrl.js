;(function () {
    'use string';

    angular
        .module('app')
        .controller('SendReviewCtrl', SendReviewCtrl);

    SendReviewCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory'];

    function SendReviewCtrl($ionicPopup, $scope, $ionicHistory) {
        const vm = this;
        vm.reviewModel = {
            items: [
                {
                    id: 1,
                    text: 'How satisfied are you with the service?',
                    rating: 0
                },
                {
                    id: 2,
                    text: 'Was the price fair?',
                    rating: 0
                },
                {
                    id: 3, text: 'Woul you recommend this doctor?',
                    rating: 0
                },
            ],
            comment: '',
            price: 0.00,
            currency: 1
        };

        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();