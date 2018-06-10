;(function () {
    angular.module('directives.starRating', [])
        .directive('starRating', starRating);

    starRating.$inject = [];

    function starRating() {
        return {
            restrict: 'E',
            templateUrl: 'directives/star-rating/star-rating.html',
            scope: {
                srCount: "@",
                srModel: "=",
                srSize: "@",
                srColor: "@",
                srEnable: "=",
            },
            controller: 'StarRatingCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
