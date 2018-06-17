;(function () {
    'use strict';

    angular.module('service.currencySvc', []).factory('currencySvc', currencySvc);

    currencySvc.$inject = ['url', 'http', '$timeout', '$q','$ionicPopup'];

    function currencySvc(url, http, $timeout, $q,$ionicPopup) {
        let cache = [];
        let model = {
            getCurrency: getCurrency,
            showSelect: showSelect,
        };
        return model;

        function getCurrency() {
            if (cache.length) {
                return $q.defer(function (resolve, reject) {
                    resolve(cache);
                });
            } else {
                return http.get(url.currencies);
            }
        }

        function showSelect($scope) {
            return $ionicPopup.show({
                templateUrl: 'components/select-currency/select-currency.html',
                scope: $scope,
            });
        }
    }
})();