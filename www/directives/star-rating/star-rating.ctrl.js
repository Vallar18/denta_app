;(function () {
    'use string';

    angular
        .module('app')
        .controller('StarRatingCtrl', StarRatingCtrl);

    StarRatingCtrl.$inject = ['$scope'];

    function StarRatingCtrl($scope) {
        const DEFAULT_COUNT = 5;
        const EMPTY = 0;
        const FULL = 1;
        let vm = this;
        let prev = {
            counts: DEFAULT_COUNT,
            value: 0,
            selectVal: 0
        };
        let arr = [];
        vm.getRatingStar = function (counts,value){
            if(prev.counts === +counts && prev.value === +value){
                return arr;
            }
            prev.counts = +counts;
            prev.value = +value;
            var count = +counts || DEFAULT_COUNT;
            arr = [];
            var type = EMPTY;
            for(var i=0;i < count;i++){
                if(i+1 <= (+value)){
                    type = FULL;
                }  else {
                    type = EMPTY;
                }
                arr.push({
                    id: i+1,
                    type: type,
                    val: i+1
                });
            }
            return arr;
        };

        vm.setValue = function(val){
            if(prev.selectVal === 1 && val === 1){
                val = 0;
            }
            prev.selectVal = val;
            $scope.srModel = val;
        }
    }

})();