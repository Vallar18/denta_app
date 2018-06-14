;(function () {
    'use string';

    angular
        .module('app')
        .controller('MenuCustomCtrl', MenuCustomCtrl);

    MenuCustomCtrl.$inject = ['$scope'];

    function MenuCustomCtrl($scope) {
        $scope.selectItem = function(item){
            $scope.model = item;
            if(angular.isDefined($scope.select)){
                $scope.select(item);
            }
        };
    }

})();