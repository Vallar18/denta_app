;(function () {
    'use strict';

    angular.module('app').controller('GeoCtrl', GeoCtrl);

    GeoCtrl.$inject = ['$state', 'geoSvc', '$cordovaGeolocation'];

    function GeoCtrl($state, geoSvc, $cordovaGeolocation) {
        var vm = this;

        var options = {timeout: 10000, enableHighAccuracy: true};
        ionic.Platform.ready(function () {
            $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                vm.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                //Wait until the map is loaded
                google.maps.event.addListenerOnce(vm.map, 'idle', function(){
                    var marker = new google.maps.Marker({
                        map: vm.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    });
                    var infoWindow = new google.maps.InfoWindow({
                        content: "Here I am!"
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infoWindow.open(vm.map, marker);
                    });
                });
            }, function (error) {
                console.log("Could not get location");
            });
        });


    }
})();