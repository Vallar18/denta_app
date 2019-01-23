;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', 'currencySvc', '$filter', 'geoSvc', 'reviewSvc', 'userSvc', 'helpSvc', '$ionicLoading'];

        function HelpCtrl($scope, currencySvc, $filter, geoSvc, reviewSvc, userSvc, helpSvc, $ionicLoading) {
            let vm = this;
            $scope.slideOpen = false;
            vm.dentistItems = [];
            vm.isEmpty = false;

            init();

            function init() {
                vm.sort = 'distance';
                getCurrentPosition();
            }

            function getCurrentPosition() {
                geoSvc.initGoogleMaps(function () {
                    geoSvc.getPosition(false).then(function (res) {
                        getDentistByCurrentPos(res.coords.latitude, res.coords.longitude);
                    }, function (res) {
                        geoSvc.errorInetOrGPS().then(function (res) {
                            if (res) {
                                getCurrentPosition();
                            } else {
                                vm.isEmpty = true;
                            }
                        });
                    });
                });
            }

            function getDentistByCurrentPos(lat, lng) {
                if (lat && lng) {
                    helpSvc.getByPos({
                        longitude: lng,
                        latitude: lat
                    }).then(function (res) {
                        if (res && res.length) {
                            vm.dentistItems = helpSvc.prepareDrFromClinic(res);
                            calculateDistance(lat, lng);
                            sortItem();
                        } else {
                            vm.isEmpty = true;
                        }
                    });
                }
            }

            function calculateDistance(lat, lng) {
                vm.dentistItems.forEach(function (val) {
                    val.distance = +geoSvc.calcDistance(
                        {
                            longitude: val.longitude,
                            latitude: val.latitude
                        },
                        {
                            longitude: lng,
                            latitude: lat
                        });
                });
                console.log(vm.dentistItems);
            }

            function sortItem() {
                let isReverse = false;
                switch (vm.sort) {
                    case 'rating':
                        isReverse = false;
                        break;
                    case 'price':
                        isReverse = false;
                        break;
                    case 'distance':
                        isReverse = false;
                        break;
                }
                vm.dentistItems = $filter('orderBy')(vm.dentistItems, vm.sort, isReverse);
            }

            $scope.$watch(function () {
                return vm.sort;
            }, function (newV, oldV) {
                if (newV !== oldV) {
                    sortItem();
                }
            });

        }
    }
)();