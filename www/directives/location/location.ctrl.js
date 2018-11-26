;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LocationCtrl', LocationCtrl);

    LocationCtrl.$inject = ['$scope', '$ionicHistory', 'geoSvc'];

    function LocationCtrl($scope, $ionicHistory, geoSvc) {
        let vm = this;
        vm.searchText = '';
        vm.search = geoSvc.searchAddress;

        vm.prepSelectedItem = () => {
            if (vm.selected_search_item) {
                geoSvc.prepareSelectedItem(vm.selected_search_item, function (location) {
                   if(angular.isFunction($scope.locGetLocation)){
                       $scope.locGetLocation(location);
                   }
                });
            }
        }

    }

})();