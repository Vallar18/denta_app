;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', 'currencySvc', '$filter', 'geoSvc', 'clinicItems', 'reviewSvc', 'userSvc', 'helpSvc'];

        function HelpCtrl($scope, currencySvc, $filter, geoSvc, clinicItems, reviewSvc, userSvc, helpSvc) {
            var vm = this;
            $scope.textModel = 'fffffffffffffffff';
            $scope.picFile = null;
            $scope.slideOpen = false;

            helpSvc.getByPos({
                longitude: 34.5538410,
                latitude: 49.5890900
            }).then(function (res) {
                console.log(res);
            });

            geoSvc.initGoogleMaps(function () {
                console.log('map is ready!');
                geoSvc.getPosition().then(function (res) {
                    console.log(res);
                    calculateDistance(res.coords);
                });
            });

            reviewSvc.getItems({
                user_id: userSvc.getUser().id,
                dentist_id: 2,
                role_id: 2
            }).then(function (res) {
                console.log(res);
            });

            userSvc.getUserInfoById(2).then(function (res) {
                    console.log(res);
                }
            );

            function calculateDistance(currentPos) {
                clinicItems.forEach(function (val) {
                    val.distance = +geoSvc.calcDistance(
                        {
                            lng: val.longitude,
                            lat: val.latitude
                        },
                        {
                            lng: currentPos.longitude,
                            lat: currentPos.latitude
                        });
                });
                console.log(clinicItems);
            }

            vm.helpArr = [
                {
                    id: 1,
                    doctor: {
                        id: 4,
                        name: 'Dr House'
                    },
                    price: 95.3,
                    rating: 1.8,
                    distance: 2.6,
                },
                {
                    id: 2,
                    doctor: {
                        id: 6,
                        name: 'Dr House2'
                    },
                    price: 25.6,
                    rating: 3.8,
                    distance: 1.0,
                },
                {
                    id: 3,
                    doctor: {
                        id: 4,
                        name: 'Dr House3'
                    },
                    price: 8.0,
                    rating: 1.8,
                    distance: 1.8,
                },
                {
                    id: 4,
                    doctor: {
                        id: 4,
                        name: 'Dr House3'
                    },
                    price: 100.5,
                    rating: 4.8,
                    distance: 9.8,
                }
            ];

            $scope.$watch(function () {
                return vm.sort;
            }, function (newV, oldV) {
                if (newV !== oldV) {
                    sortItem();
                }
            });

            function sortItem() {
                var isReverse = false;
                switch (vm.sort) {
                    case 'rating':
                        isReverse = true;
                        break;
                    case 'price':
                        isReverse = false;
                        break;
                    case 'distance':
                        isReverse = true;
                        break;
                }
                vm.helpArr = $filter('orderBy')(vm.helpArr, vm.sort, isReverse);
            }

            init();

            function init() {
                vm.sort = 'rating';
                sortItem();
            }
        }
    }
)();