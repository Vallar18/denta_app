;(function () {
    'use strict';

    angular.module('service.currencySvc', []).factory('currencySvc', currencySvc);

    currencySvc.$inject = ['url', 'http', '$timeout', '$q','$ionicPopup'];

    function currencySvc(url, http, $timeout, $q,$ionicPopup) {
        let cache = [];
        let model = {
            getCurrency: getCurrency,
            showSelect: showSelect,
            getIndexByName: getIndexByName
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

        /**
         * @description Find in currency array item with name === name in parameters, if found - return index;
         * @param currencyName - name of currency, 'USD'
         * @param array - optional, array of currency if need, by default use cache array
         * @returns {number}
         */
        function getIndexByName(currencyName,array){
            if(currencyName){
                let findArray = angular.isArray(array) ? array : cache;
                return findArray.findIndex(function(item){
                    return item.name && item.name === currencyName;
                })
            }
            return 0;
        }

        function showSelect($scope) {
            return $ionicPopup.show({
                templateUrl: 'components/select-currency/select-currency.html',
                scope: $scope,
            });
        }
    }
})();