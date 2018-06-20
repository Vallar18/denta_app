;(function () {
    'use strict';

    angular
        .module('app')
        .controller('SendReviewCtrl', SendReviewCtrl);

    SendReviewCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory','toastr','messagesSvc'];

    function SendReviewCtrl($ionicPopup, $scope, $ionicHistory,toastr, messagesSvc) {
        const vm = this;
        vm.sendReview = sendReview;
        vm.back = function () {
            $ionicHistory.goBack();
        };
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
            price: null,
            currency: 1
        };

        function sendReview(){
            if(!vm.reviewModel.comment.length){
                toastr.error(messagesSvc.error.emptyReview);
            } else {

            }
        }
    }
})();