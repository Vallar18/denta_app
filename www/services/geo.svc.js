;(function () {
    'use strict';

    angular.module('service.geoSvc', []).factory('geoSvc', geoSvc);

    geoSvc.$inject = ['$cordovaGeolocation', '$ionicLoading',
        '$rootScope', '$cordovaNetwork', 'networkMonitorSvc', '$q', '$ionicPopup', '$translate'];

    function geoSvc($cordovaGeolocation, $ionicLoading,
                    $rootScope, $cordovaNetwork, networkMonitorSvc, $q, $ionicPopup, $translate) {
        let watcherPosition;
        const TIMEOUT_LOADING_SHOW = 30000;
        let counter_get_position = 0;
        let is_accurate_position = false;
        let vm = this;
        let API_KEY = 'AIzaSyD6o8M_KOerds2uacnudjI62elbLTMyBaY';
        let map = null;
        let gmap = null;
        var directionsService;
        var directionsDisplay;
        let marker;
        let geocoder;
        let googleReadyCallback;
        let distance_service;
        let BASE_CONFIG_MAP = {
            zoom: 14,
            disableDefaultUI: true,
        };
        let markersItems = [];
        let markers = [];

        function initGoogleAutocomplite() {
            let script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.id = "googleMaps";
            if (API_KEY) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&language=en&libraries=geometry,places';
            }
            document.body.appendChild(script);
        }

        function resetMarker() {
            if (markersItems.length) {
                markersItems.forEach(function (val) {
                    val.marker.setMap(null);
                    window.google.maps.event.removeListener(val.event);
                });
            }
            if (marker) {
                marker.setMap(null);
            }
            markersItems.length = 0;
        }

        function errorInetOrGPS() {
            return $ionicPopup.confirm({
                title: 'Geolocation error',
                template: 'Please check the Internet, and check geolocation (GPS) is enabled on your device'
            });
        }


        function checkGoogleAutocomplite() {
            if (!gmap && checkGoogle()) {
                gmap = new window.google.maps.places.AutocompleteService();
            }
        }

        function checkGoogle() {
            if (!window.google || !window.google.maps || !window.google.maps.places) {
                return false;
            }
            return true;
        }

        function searchAddress(address, callback) {
            checkGoogleAutocomplite();
            var deferred = $q.defer();
            try {
                gmap.getPlacePredictions({
                    input: address
                }, function (predictions) {
                    deferred.resolve(predictions && predictions.length ? angular.copy(predictions) : []);
                    callback();
                });
            } catch (e) {
                deferred.reject([]);
            }
            return deferred.promise;
        }

        function prepareSelectedItem(address, callback) {
            let geocoder = new google.maps.Geocoder();
            geocoder.geocode({'address': address.description}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    callback({
                        address: address.description,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                }
            });
        }

        function mapByOptions(options) {
            return new window.google.maps.Map(document.getElementById("map"), options);
        }

        function createPos(lat, lng) {
            return new window.google.maps.LatLng(+lat, +lng);
        }

        function createMarker(config) {
            return new window.google.maps.Marker(config);
        }

        function initMap() {
            getPosition(false).then(function (pos) {
                addSearch();
                $ionicLoading.show({
                    template: 'Loading map...',
                    duration: TIMEOUT_LOADING_SHOW
                });
                let latLng = createPos(pos.coords.latitude, pos.coords.longitude);
                let mapOptions = angular.extend({}, BASE_CONFIG_MAP, {
                    center: latLng,
                    mapTypeId: window.google.maps.MapTypeId.ROADMAP
                });
                map = mapByOptions(mapOptions);
                marker = createMarker({
                    position: latLng,
                    map: map,
                    draggable: true,
                });
                enableMap();
                window.google.maps.event.addListenerOnce(map, 'idle', function () {
                    window.google.maps.event.addListener(map, 'click', function (event) {
                        marker.setPosition(event.latLng);
                    });
                });
            }, function (error) {
                $ionicLoading.hide();
                errorInetOrGPS().then(function (res) {
                    if (res) {
                        initMap();
                    }
                });
                console.log("Could not get location");
            });
        }

        function calcRoute(start, end) {
            var request = {
                origin: start,
                destination: end,
                travelMode: 'WALKING'
            };
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    directionsDisplay.setDirections(result);
                }
            });
        }

        function enableMap() {
            $ionicLoading.hide();
        }

        function disableMap() {
            $ionicLoading.show({
                template: 'You must be connected to the Internet to use Google Maps API.'
            });
        }

        function readyMap() {
            distance_service = new window.google.maps.DistanceMatrixService();
            geocoder = new window.google.maps.Geocoder;
            $ionicLoading.hide();
            if (angular.isFunction(googleReadyCallback)) {
                googleReadyCallback();
            }
        }

        function loadGoogleMaps() {
            $ionicLoading.show({
                template: 'Loading Google Maps',
                duration: TIMEOUT_LOADING_SHOW
            });
            window.mapInit = function () {
                readyMap();
            };
            let script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.id = "googleMaps";
            if (API_KEY) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&language=en&libraries=geometry,places&callback=mapInit';
            }
            document.body.appendChild(script);
        }

        function checkLoaded() {
            if (!isMapReady()) {
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

        function calcDistance(p1, p2) {
            if (p1 && p1.latitude && p1.longitude && p2 && p2.latitude && p2.longitude) {
                let point1 = createPos(p1.latitude, p1.longitude);
                let point2 = createPos(p2.latitude, p2.longitude);
                return (window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
            }
            return 0;
        }

        function calcTime(p1, p2, type) {
            $ionicLoading.show({
                template: 'Getting info about clinic...'
            });
            let promise = $q.defer();
            if (p1 && p1.latitude && p1.longitude && p2 && p2.latitude && p2.longitude) {
                let pointA = createPos(p1.latitude, p1.longitude);
                let pointB = createPos(p2.latitude, p2.longitude);
                distance_service.getDistanceMatrix(
                    {
                        origins: [pointA],
                        destinations: [pointB],
                        travelMode: angular.isDefined(type) ? type : 'WALKING',
                        // transitOptions: TransitOptions,
                        // drivingOptions: DrivingOptions,
                        // unitSystem: UnitSystem,
                        // avoidHighways: true,
                        // avoidTolls: false,
                    }, function (res, status) {
                        promise.resolve(res, status);
                        $ionicLoading.hide();
                    });
            }
            return promise.promise;
        }


        function getAddress(latlng, callback, errorCallback) {
            if (!isMapReady()) {
                errorInetOrGPS().then(function () {
                    errorCallback();
                });
            }
            let addressObj = {
                lat: latlng.lat || latlng.latitude,
                lng: latlng.lng || latlng.longitude,
                address: '',
                results: []
            };
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        addressObj.address = results[0].formatted_address;
                        addressObj.results = results[0].address_components;
                        callback(addressObj);
                    } else {
                        callback(addressObj);
                    }
                } else {
                    callback(addressObj);
                }
            });
        }


        function clearWatchPosition() {
            if (watcherPosition && watcherPosition.clearWatch) {
                watcherPosition.clearWatch();
            }
        }

        function watchPosition(callback, accuracy) {
            let watchOptions = {
                timeout: 30000,
                enableHighAccuracy: angular.isDefined(accuracy) ? accuracy : true // may cause errors if true
            };
            if (watcherPosition && watcherPosition.clearWatch) {
                watcherPosition.clearWatch();
            }
            watcherPosition = $cordovaGeolocation.watchPosition(watchOptions).then(null, function (errRes) {
                console.log(errRes);
            }, function (position) {
                if (callback) {
                    callback(position);
                }
                console.log(position);
            });
        }


        /**
         * @description return true if maps defined
         * @returns {boolean}
         */
        function isMapReady() {
            return (angular.isDefined(window.google) && angular.isDefined(window.google.maps));
        }

        function init() {
            if (!isMapReady()) {
                console.warn("Google Maps SDK needs to be loaded");
                disableMap();
                if (networkMonitorSvc.isOnline()) {
                    loadGoogleMaps();
                }
            }
            else {
                if (networkMonitorSvc.isOnline()) {
                    enableMap();
                    readyMap();
                } else {
                    disableMap();
                }
            }
            addConnectivityListeners();
        }

        function getMarkerPosition() {
            return {
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng(),
            };
        }

        function getPosition() {
            let defered = $q.defer();
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner> <br> Getting position...'
            });
            let options = {
                // maximumAge: 120 * 1000,
                timeout: 30000,
                enableHighAccuracy: is_accurate_position
            };
            if (counter_get_position > 0) {
                options.enableHighAccuracy = !is_accurate_position;
            }
            $cordovaGeolocation.getCurrentPosition(options).then(function (res) {
                $ionicLoading.hide();
                counter_get_position = 0;
                defered.resolve(res);
            }, function (res) {
                counter_get_position++;
                $ionicLoading.hide();
                defered.reject(res);
            });
            return defered.promise;
        }

        function mapWithMarker() {
            resetMarker();
            googleReadyCallback = function () {
                initMap();
            };
            init();
        }

        function initGoogleMaps(callback) {
            if (angular.isFunction(callback)) {
                googleReadyCallback = function () {
                    callback();
                };
            }
            init();
        }


        function createMarkerByArr(arrPosObject, map, callback) {
            if (angular.isArray(arrPosObject) && map) {
                arrPosObject.forEach(function (val) {
                    if (val.latitude && val.longitude) {
                        let tempMarker = createMarker({
                            position: createPos(val.latitude, val.longitude),
                            map: map,
                            draggable: false,
                            label: {text: '+', color: 'white', fontSize: '25px', fontWeight: '1000'},
                            zIndex: 10
                        });
                        markers.push(tempMarker);
                        tempMarker.clinicObj = val;
                        let tempEvent = window.google.maps.event.addListener(tempMarker, 'click', function () {
                            callback(this);
                        });
                        markersItems.push({
                            marker: tempMarker,
                            event: tempEvent
                        });
                    }
                });

            }
        }

        /**
         * @description Show point on map based on coordinates in arrPosObject array;
         * @param arrPosObject (need contain property latitude and longitude)
         * @param center - center of map, center.lat, center.lng
         * @param callback - call function callback when click to marker of clinic
         * @param isCenterClinic - if true then set clinic position as center map, else set user position as center
         */
        function showOnMap(arrPosObject, center, callback, isCenterClinic) {
            if (!angular.isArray(arrPosObject) || !center || !center.lat || !center.lng) {
                return;
            }
            resetMarker();
            googleReadyCallback = function () {
                $ionicLoading.show({
                    template: 'Initialize map...'
                });
                let latLngUser = createPos(center.lat, center.lng);
                let clinicLatLng;
                if (isCenterClinic) {
                    clinicLatLng = createPos(arrPosObject[0].latitude, arrPosObject[0].longitude);
                    directionsService = new google.maps.DirectionsService();
                    directionsDisplay = new google.maps.DirectionsRenderer();
                }
                let mapOptions = angular.extend({}, BASE_CONFIG_MAP,
                    {
                        zoom: 12,
                        center: isCenterClinic ? clinicLatLng : latLngUser,
                        mapTypeId: window.google.maps.MapTypeId.ROADMAP
                    });
                map = mapByOptions(mapOptions);

                if (isCenterClinic) {
                    directionsDisplay.setMap(map);
                    let start = createPos(center.lat, center.lng);
                    let end = createPos(arrPosObject[0].latitude, arrPosObject[0].longitude);
                    calcRoute(start, end)
                }
                marker = createMarker({
                    position: latLngUser,
                    map: map,
                    draggable: false,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    zIndex: 1
                });
                window.google.maps.event.addListenerOnce(map, 'idle', function () {
                    enableMap();
                });
                markers = [];
                var markerCluster = null;
                window.google.maps.event.addListener(map, 'bounds_changed', function () {
                    var arr = [];
                    arrPosObject.forEach(val => {
                        var currentLocation = new google.maps.LatLng(val.latitude, val.longitude);
                        if (map.getBounds().contains(currentLocation)) {
                            arr.push(val);
                        }
                    });
                    if (markers && markers.length && arr && arr.length) {
                        if(arrPosObject.length == arr.length){
                            return;
                        }
                        markers.forEach(item => {
                            arr.forEach((val, i) => {
                                if (val.id === item.clinicObj.id) {
                                    arr.splice(i, 1);
                                }
                            })
                        })
                        if (!arr.length) {
                            return;
                        }
                    }
                    createMarkerByArr(arr, map, callback);
                    if (!markerCluster) {
                         markerCluster = new MarkerClusterer(map, markers,
                            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                    } else {
                        markerCluster.addMarkers(markers, false)
                    }
                });

            };
            init();

        }

        return {
            errorInetOrGPS: errorInetOrGPS,
            calcTime: calcTime,
            showOnMap: showOnMap,
            initGoogleMaps: initGoogleMaps,
            mapWithMarker: mapWithMarker,
            getPosition: getPosition,
            calcDistance: calcDistance,
            watchPosition: watchPosition,
            clearWatchPosition: clearWatchPosition,
            getMarkerPosition: getMarkerPosition,
            getAddress: getAddress,
            init: init,
            prepareSelectedItem: prepareSelectedItem,
            searchAddress: searchAddress,
            initGoogleAutocomplite: initGoogleAutocomplite
        };

    }
})();