;(function () {
    'use strict';

    angular
        .module('app')
        .controller('LocationCtrl', LocationCtrl);

    LocationCtrl.$inject = ['$scope', '$ionicHistory', 'geoSvc'];

    function LocationCtrl($scope, $ionicHistory, geoSvc) {
        let vm = this;
        vm.searchText = $scope.locModel;
        vm.search = geoSvc.searchAddress;
        let body = document.getElementsByTagName('body')[0];
        body.style.height = '100%';
        vm.prepSelectedItem = () => {
            if (vm.selected_search_item) {
                geoSvc.prepareSelectedItem(vm.selected_search_item, function (location) {
                    if (angular.isFunction($scope.locGetLocation)) {
                        $scope.locGetLocation(location);
                    }
                });
            }
        }


    }
})();