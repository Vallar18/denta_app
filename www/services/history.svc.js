;(function () {
    'use strict';

    angular.module('service.historySvc', []).factory('historySvc', historySvc);

    historySvc.$inject = [];

    function historySvc() {
        var model = {};
        return model;
    }
})();