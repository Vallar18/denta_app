;(function () {
    'use strict';

    angular.module('app').controller('GeoCtrl', GeoCtrl);

    GeoCtrl.$inject = ['$state', 'geoSvc'];

    function GeoCtrl($state, geoSvc) {
        let vm = this;
        geoSvc.mapWithMarker();

    }
})();