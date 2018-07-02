;(function () {
    'use strict';
    angular.module('filters.currency_by_id', [])
        .filter('currency_by_id', ['currencySvc', function (currencySvc) {
            return function (id) {
                if(currencySvc.getById(id)){
                    return currencySvc.getById(id).abr;
                }
                return '';
            };
        }]);
})();