;(function () {
    angular.module('directives.reviewItem', [])
        .directive('reviewItem', reviewItem);

    reviewItem.$inject = [];

    function reviewItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/review-item/review-item.html',
            scope: {
                riDate: '<',
                riName: '<',
                riRating: '<',
                riText: '<'
            },
            controller: 'ReviewItemCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
