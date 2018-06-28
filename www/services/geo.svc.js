;(function () {
        'use strict';

        angular.module('service.geoSvc', []).factory('geoSvc', geoSvc);

        geoSvc.$inject = ['$cordovaGeolocation', '$ionicLoading',
            '$rootScope', '$cordovaNetwork', 'networkMonitorSvc', '$q', '$ionicPopup'];

        function geoSvc($cordovaGeolocation, $ionicLoading,
                        $rootScope, $cordovaNetwork, networkMonitorSvc, $q, $ionicPopup) {
            let watcherPosition;
            let vm = this;
            let API_KEY = 'AIzaSyD6o8M_KOerds2uacnudjI62elbLTMyBaY';
            let map = null;
            let autocomplete;
            let marker;
            let geocoder;
            let googleReadyCallback;
            let distance_service;
            let BASE_CONFIG_MAP = {
                zoom: 14,
                disableDefaultUI: true,
            };
            let markersItems = [];


            function resetMarker(){
                if(markersItems.length){
                    markersItems.forEach(function(val){
                        val.setMap(null);
                    });
                }
                if(marker){
                    marker.setMap(null);
                }
                markersItems.length = 0;
            }

            function errorInetOrGPS() {
                return $ionicPopup.confirm({
                    title: 'Some error',
                    template: 'Please check the Internet, and if geolocation (GPS) is enabled on your device'
                });
            }

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
                $ionicLoading.show({
                    template: 'Getting position...'
                });
                getPosition().then(function (pos) {
                    $ionicLoading.show({
                        template: 'Loading map...'
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
                    window.google.maps.event.addListenerOnce(map, 'idle', function () {
                        window.google.maps.event.addListener(map, 'click', function (event) {
                            marker.setPosition(event.latLng);
                        });
                        enableMap();
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
                    template: 'Loading Google Maps'
                });
                window.mapInit = function () {
                    readyMap();
                };
                let script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.id = "googleMaps";
                if (API_KEY) {
                    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&language=en&libraries=drawing,geometry,places&callback=mapInit';
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

            function calcDistance(p1, p2) {
                if (p1 && p1.lat && p1.lng && p2 && p2.lat && p2.lng) {
                    let point1 = createPos(p1.lat, p1.lng);
                    let point2 = createPos(p2.lat, p2.lng);
                    return (window.google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000).toFixed(2);
                }
                return 0;
            }

            function calcTime(p1, p2, type) {
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
                            promise.resolve(res,status);
                        });
                }
                return promise.promise;
            }


            function getAddress(latlng, callback) {
                let addressObj = {
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

            function init() {
                if (angular.isUndefined(window.google) || angular.isUndefined(window.google.maps)) {
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

            function getPosition(accuracy) {
                let options = {
                    timeout: 30000,
                    enableHighAccuracy: angular.isDefined(accuracy) ? accuracy : true
                };
                return $cordovaGeolocation.getCurrentPosition(options);
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


            function createMarkerByArr(arrPosObject, map, callback){
                if(angular.isArray(arrPosObject) && map){
                    arrPosObject.forEach(function(val){
                        if(val.latitude && val.longitude){
                            let tempMarker = createMarker({
                                position: createPos(val.latitude,val.longitude),
                                map: map,
                                draggable: false,
                                label: {text: '+', color: 'white', fontSize: '25px', fontWeight: '1000'}
                            });
                            tempMarker.clinicObj = val;
                            markersItems.push(tempMarker);
                            window.google.maps.event.addListener(tempMarker, 'click', function() {
                                callback(this);
                            });
                        }
                    });
                }
            }

            /**
             * @description Show point on map based on coordinates in arrPosObject array;
             * @param arrPosObject (need contain property latitude and longitude)
             * @param center - center of map, center.lat, center.lng
             */
            function showOnMap(arrPosObject, center, callback) {
                if (!angular.isArray(arrPosObject) || !center || !center.lat || !center.lng) {
                    return;
                }
                resetMarker();
                googleReadyCallback = function () {
                    $ionicLoading.show({
                        template: 'Initialize map...'
                    });
                    let latLng = createPos(+center.lat, +center.lng);
                    let mapOptions = angular.extend({}, BASE_CONFIG_MAP,
                        {
                            zoom: 12,
                            center: latLng,
                            mapTypeId: window.google.maps.MapTypeId.ROADMAP
                        });
                    map = mapByOptions(mapOptions);
                    createMarkerByArr(arrPosObject,map, callback);
                    marker = createMarker({
                        position: latLng,
                        map: map,
                        draggable: false,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                    });
                    window.google.maps.event.addListenerOnce(map, 'idle', function () {
                        enableMap();
                    });
                };
                init();
            }

            return {
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
                init: init
            };

        }
    }

)();