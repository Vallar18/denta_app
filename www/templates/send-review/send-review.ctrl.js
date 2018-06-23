;(function () {
    'use strict';

    angular
        .module('app')
        .controller('SendReviewCtrl', SendReviewCtrl);

    SendReviewCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory', 'toastr', 'messagesSvc', 'currencySvc', 'currencieItems', '$stateParams', 'reviewSvc', 'userSvc','questionItems'];

    function SendReviewCtrl($ionicPopup, $scope, $ionicHistory, toastr, messagesSvc, currencySvc, currencieItems, $stateParams, reviewSvc, userSvc,questionItems) {
        const vm = this;
        vm.currencies = currencieItems;
        vm.select_currency = vm.currencies[currencySvc.getDefaultIndex()];
        vm.sendReview = sendReview;
        vm.selectCurrency = selectCurrency;
        vm.getSelectCurrency = getSelectCurrency;
        vm.back = function () {
            $ionicHistory.goBack();
        };
        vm.questionItems = questionItems;

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
                    id: 3, text: 'Would you recommend this doctor?',
                    rating: 0
                },
            ],
            comment: '',
            price: null,
            currency: 1
        };

        function sendReview() {
            if (!vm.reviewModel.comment.length) {
                toastr.error(messagesSvc.error.emptyReview);
            } else {
                reviewSvc.create({
                    user_id: userSvc.getUser().id,
                    emergency_id: $stateParams.emergencyId,
                    currency_id: vm.reviewModel.currency,
                    questions: {},
                    description: vm.reviewModel.description,
                    price: vm.reviewModel.price
                }).then(function (res) {
                    if (res && res.success) {
                        toastr.success('Success send review!');
                        $ionicHistory.goBack();
                    }
                });
            }
        }

        function selectCurrency(currency) {
            vm.select_currency = currency;
            vm.currencyPopup.close();
        }

        function getSelectCurrency() {
            $scope.data = {};
            vm.currencyPopup = $ionicPopup.show({
                templateUrl: 'components/select-currency/select-currency.html',
                scope: $scope,
                cssClass: 'select-currency-popup'
            });
        }
    }
})();