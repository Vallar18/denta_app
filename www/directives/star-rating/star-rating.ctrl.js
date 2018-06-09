;(function () {
    'use string';

    angular
        .module('app')
        .controller('StarRatingCtrl', StarRatingCtrl);

    StarRatingCtrl.$inject = ['$scope'];

    function StarRatingCtrl($scope) {
        let DEFAULT_COUNT = 5;
        $scope.getCount = function(count){
            return new Array(count || DEFAULT_COUNT);
        }
    }

})();