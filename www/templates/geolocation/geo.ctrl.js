;(function () {
    'use strict';

    angular.module('app').controller('GeoCtrl', GeoCtrl);

    GeoCtrl.$inject = ['$state', 'geoSvc', 'helpSvc', '$stateParams','clinicSvc'];

    function GeoCtrl($state, geoSvc, helpSvc, $stateParams, clinicSvc) {
        let vm = this;
        vm.clinicItems = [];
        vm.dentistItems = [];
        vm.currentPos = {};

        init();
        function init() {
            getCurrentPosition();
        }

        function getCurrentPosition() {
            geoSvc.initGoogleMaps(function () {
                console.log('map is ready!');
                geoSvc.getPosition().then(function (res) {
                    vm.currentPos.latitude = res.coords.latitude;
                    vm.currentPos.longitude = res.coords.longitude;
                    if($stateParams.clinic_id){
                       getClinicById($stateParams.clinic_id, res.coords.latitude, res.coords.longitude);
                    } else {
                        getDentistByCurrentPos(res.coords.latitude, res.coords.longitude);
                    }
                });
            });
        }

        function getClinicById(id, lat, lng){
            clinicSvc.getOne(id).then(function(res){
                if (res) {
                    vm.clinicItems = [res];
                }
                geoSvc.showOnMap(vm.clinicItems,
                    {
                        lng: lng,
                        lat: lat
                    }, showDetails);
            });
        }

        function getDentistByCurrentPos(lat, lng) {
            if (lat && lng) {
                helpSvc.getByPos({
                    longitude: lng,
                    latitude: lat
                }).then(function (res) {
                    if (res.length) {
                        vm.clinicItems = res.filter(function (v) {
                            return v.users.length;
                        });
                    }
                    geoSvc.showOnMap(vm.clinicItems,
                        {
                            lng: lng,
                            lat: lat
                        }, showDetails);
                });
            }
        }

        /**
         * @description function for process click action on clinic marker
         * @param item - object of marker with clinic
         */
        function showDetails(item) {
            if (item && item.clinicObj && item.clinicObj.users) {
                vm.dentistItems = [];
                let from = vm.currentPos;
                let to = {
                    latitude: item.clinicObj.latitude,
                    longitude: item.clinicObj.longitude,
                };
                geoSvc.calcTime(from, to).then(function (res, status) {
                    item.clinicObj.users.forEach(function (val) {
                        let tempDentObj = val;
                        try {
                            tempDentObj.time = res.rows[0].elements[0].duration.text;
                        } catch (err) {
                            tempDentObj.time = 'Unknown';
                        }
                        tempDentObj.address = item.clinicObj.address;
                        vm.dentistItems.push(tempDentObj);
                        console.log(vm.dentistItems);
                    });
                });
            }
        }

    }
})();