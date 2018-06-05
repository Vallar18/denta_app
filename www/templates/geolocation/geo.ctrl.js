;(function () {
    'use strict';

    angular
        .module('app')
        .controller('GeoCtrl', GeoCtrl);

    GeoCtrl.$inject = ['$state'];

    function GeoCtrl($state) {
        var vm = this;
    }
})();