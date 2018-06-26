;(function () {
    'use strict';

    angular.module('service.geoSvc', []).factory('geoSvc', geoSvc);

    geoSvc.$inject = ['$cordovaGeolocation', '$ionicLoading',
        '$rootScope', '$cordovaNetwork', 'networkMonitorSvc'];

    function geoSvc($cordovaGeolocation, $ionicLoading,
                    $rootScope, $cordovaNetwork, networkMonitorSvc) {
        var watcherPosition;
        let vm = this;
        let API_KEY = 'AIzaSyD6o8M_KOerds2uacnudjI62elbLTMyBaY';
        let map = null;
        let counterTryGetPosition = 0;
        var autocomplete;
        var marker;
        var geocoder;

        function addSearch() {
            var input = document.getElementById('searchMapTextField');
            autocomplete = new window.google.maps.places.Autocomplete(input);
            window.google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                console.log(place);
            });
            // autocomplete = new window.google.maps.places.Autocomplete(input, {});
            // autocomplete.addListener('place_changed', function() {
            //     var place = autocomplete.getPlace();
            //     processSelectedPlace(place);
            //     console.log(place);
            // });
        }

        // function processSelectedPlace(place) {
        //     console.log(place);
        // }

        function initMap(isAccuracy) {
            $ionicLoading.show({
                template: 'Initialize map <br> Getting position...'
            });
            let options = {timeout: 30000, enableHighAccuracy: true};
            if (angular.isDefined(isAccuracy)) {
                options.enableHighAccuracy = isAccuracy;
            }
            $cordovaGeolocation.getCurrentPosition(options)
                .then(function (position) {
                    let latLng = new window.google.maps.LatLng(position.coords.latitude,
                        position.coords.longitude);
                    let mapOptions = {
                        center: latLng,
                        zoom: 14,
                        disableDefaultUI: true,
                        mapTypeId: window.google.maps.MapTypeId.ROADMAP
                    };
                    geocoder = new window.google.maps.Geocoder;
                    map = new window.google.maps.Map(document.getElementById("map"),
                        mapOptions);
                    marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        draggable: true,
                    });
                    $ionicLoading.hide();
                    // addSearch();
                    window.google.maps.event.addListenerOnce(map, 'idle', function () {
                        window.google.maps.event.addListener(map, 'dragend', function () {
                        });
                        window.google.maps.event.addListener(map, 'zoom_changed', function () {
                            console.log("zoomed!");
                        });
                        enableMap();
                    });
                }, function (error) {
                    $ionicLoading.hide();
                    initMap();
                    console.log("Could not get location");
                });
        }

        function enableMap() {
            $ionicLoading.hide();
        }

        function disableMap() {
            $ionicLoading.show({
                template: 'You must be connected to the Internet to view this map.'
            });
        }

        function loadGoogleMaps() {
            $ionicLoading.show({
                template: 'Loading Google Maps'
            });
            window.mapInit = function () {
                initMap();
            };
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.id = "googleMaps";
            if (API_KEY) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY
                    + '&libraries=drawing,geometry,places&callback=mapInit';
            }
            else {
                script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?libraries=drawing,geometry,places&callback=mapInit');
            }
            document.body.appendChild(script);
        }

        function checkLoaded() {
            if (angular.isUndefined(window.google) || angular.isUndefined(window.google.maps)) {
                loadGoogleMaps();
            } else {
                enableMap();
            }
        }

        function addConnectivityListeners() {
            if (window.ionic.Platform.isWebView()) {
                $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                    checkLoaded();
                });
                $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                    disableMap();
                });
            }
            else {
                window.addEventListener("online", function (e) {
                    checkLoaded();
                }, false);
                window.addEventListener("offline", function (e) {
                    disableMap();
                }, false);
            }
        }

        function getAddress(latlng, callback) {
            var addressObj = {
                lat: latlng.lat,
                lng: latlng.lng,
                address: ''
            };
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        addressObj.address = results[0].formatted_address;
                        callback(addressObj);
                    } else {
                        callback(addressObj);
                    }
                } else {
                    callback(addressObj);
                }
            });
        }


        function clearWatchPosition(){
            if(watcherPosition && watcherPosition.clearWatch){
                watcherPosition.clearWatch();
            }
        }

        function watchPosition() {
            let watchOptions = {
                timeout: 30000,
                enableHighAccuracy: true // may cause errors if true
            };
            if(watcherPosition && watcherPosition.clearWatch){
                watcherPosition.clearWatch();
            }
            watcherPosition = $cordovaGeolocation.watchPosition(watchOptions).then(null,function (errRes) {
                console.log(errRes);
            }, function (position) {
                console.log(position);
            });
        }

        return {
            watchPosition: watchPosition,
            clearWatchPosition: clearWatchPosition,
            getMarkerPosition: function () {
                return {
                    lat: marker.getPosition().lat(),
                    lng: marker.getPosition().lng(),
                };
            },
            getAddress: getAddress,
            init: function (key) {
                if (angular.isDefined(key)) {
                    API_KEY = key;
                }
                if (angular.isUndefined(window.google) || angular.isUndefined(window.google.maps)) {
                    console.warn("Google Maps SDK needs to be loaded");
                    disableMap();
                    if (networkMonitorSvc.isOnline()) {
                        loadGoogleMaps();
                    }
                }
                else {
                    if (networkMonitorSvc.isOnline()) {
                        initMap();
                        enableMap();
                    } else {
                        disableMap();
                    }
                }
                addConnectivityListeners();
            }
        }

    }
})();