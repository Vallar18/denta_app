;(function () {
    'use strict';

    angular
        .module('app')
        .controller('StarRatingCtrl', StarRatingCtrl);

    StarRatingCtrl.$inject = ['$scope'];

    function StarRatingCtrl($scope) {
        var DEFAULT_COUNT = 5;
        var vm = this;
        var prev = {
            counts: DEFAULT_COUNT,
            value: 0,
            selectVal: 0
        };
        var arr = [];

        vm.ratingArr = getRatingStar($scope.srCount,$scope.srModel);

        $scope.$watch('srCount',function(newV,oldV){
            if(newV !== oldV){
                $scope.$evalAsync(function () {
                vm.ratingArr = getRatingStar(newV,$scope.srModel);
            });
        }});
        $scope.$watch('srModel',function(newV,oldV){
            if(newV !== oldV){
                $scope.$evalAsync(function () {
                    vm.ratingArr = getRatingStar($scope.srCount,newV);
                });
            }
        });

        function getRatingStar(counts, value) {
            var count = +counts || DEFAULT_COUNT;
            var values = !value || +value<0 ? 0 : +value;
            // if (prev.counts === count && prev.value === values && arr.length) {
            //     return arr;
            // }
            prev.counts = count;
            prev.value = values;
            arr = [];
            var type = 'ion-ios-star';
            for (var i = 0; i < count; i++) {
                if (i + 1 <= (+value)) {
                    type = 'ion-ios-star';
                } else {
                    type = 'ion-ios-star-outline';
                }
                arr.push({
                    id: i + 1,
                    type: type,
                    val: i + 1
                });
            }
            return arr;
        };

        vm.setValue = function (val) {
            if (prev.selectVal === 1 && val === 1) {
                val = 0;
            }
            prev.selectVal = val;
            $scope.srModel = val;
            if(angular.isDefined($scope.srSelect) && typeof $scope.srSelect === 'function'){
                $scope.srSelect(val);
            }
        }
    }

})();