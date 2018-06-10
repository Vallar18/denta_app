;(function () {
    angular.module('directives.starRating', [])
        .directive('starRating', starRating);

    starRating.$inject = [];

    function starRating() {
        return {
            restrict: 'E',
            templateUrl: 'directives/star-rating/star-rating.html',
            scope: {
                srCount: "@", // 0 and more, count of stars
                srModel: "=", //model save selected star value or set star value
                srSize: "@", //size of star, css format ( 24px, 2rem etc.)
                srColor: "@", //color in css format ( #fff, black, rgba(230,0,34) )
                srEnable: "=", //if  true - click on star change model, if false - only view star
            },
            controller: 'StarRatingCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs, ctrl) {
            }
        };
    }
})();
