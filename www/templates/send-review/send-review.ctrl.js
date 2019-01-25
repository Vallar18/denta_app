;(function () {
    'use strict';

    angular
        .module('app')
        .controller('SendReviewCtrl', SendReviewCtrl);

    SendReviewCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory', 'toastr', 'messagesSvc', 'currencySvc', '$translate',
        'currencieItems', '$stateParams', 'reviewSvc', 'userSvc', 'questionItems'];

    function SendReviewCtrl($ionicPopup, $scope, $ionicHistory, toastr, messagesSvc, currencySvc, $translate,
                            currencieItems, $stateParams, reviewSvc, userSvc, questionItems) {
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

        init();

        function init(){
            $translate('CONTENT.TEXT_GIVE_REVIEW_ASK_SATISFIED').then(function (text) {
                $scope.ask_satisfeid = text;
            });
            $translate('CONTENT.TEXT_GIVE_REVIEW_ASK_PRICE').then(function (text) {
                $scope.ask_price = text;
            });
            $translate('CONTENT.TEXT_GIVE_REVIEW_ASK_RECOMMEND').then(function (text) {
                $scope.ask_recommend = text;
            });
            $translate('SUCCESS.SEND_REVIEW').then(function (text) {
                $scope.succes_send_review = text;
            });
        }

        vm.reviewModel = {
            items: [
                {
                    id: 1,
                    text: $scope.ask_satisfeid,
                    rating: 0
                },
                {
                    id: 2,
                    text: $scope.ask_price,
                    rating: 0
                },
                {
                    id: 3,
                    text: $scope.ask_recommend,
                    rating: 0
                },
            ],
            comment: '',
            price: null,
            currency: 1
        };

        function getRatingObj() {
            let rObj = {};
            angular.forEach(vm.questionItems, function (val, key) {
                rObj[val.id] = val.rating;
            });
            return rObj;
        }

        function sendReview() {
            if (!vm.reviewModel.comment.length) {
                toastr.error(messagesSvc.error().emptyReview);
                return;
            }
            if (vm.reviewModel.price <= 0) {
                toastr.error(messagesSvc.error().correctPrice);
                return;
            }
            reviewSvc.create({
                user_id: userSvc.getUser().id,
                emergency_id: $stateParams.emergencyId,
                currency_id: vm.select_currency.id,
                questions: getRatingObj(),
                description: vm.reviewModel.comment,
                price: vm.reviewModel.price
            }).then(function (res) {
                if (res && res.success) {
                    toastr.success($scope.succes_send_review);
                    $ionicHistory.goBack();
                } else if (res && !res.success && res.message) {
                    toastr.error(res.message);
                }
            });
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