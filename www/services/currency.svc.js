;(function () {
    'use strict';

    angular.module('service.currencySvc', []).factory('currencySvc', currencySvc);

    currencySvc.$inject = ['url', 'http', '$timeout', '$q', '$ionicPopup', 'utilsSvc'];

    function currencySvc(url, http, $timeout, $q, $ionicPopup, utilsSvc) {
        var DEFAULT_CURR_NAME = 'USD';
        var cache = [];
        var search_cache = {};
        var model = {
            getCurrency: getCurrency,
            showSelect: showSelect,
            getIndexByName: getIndexByName,
            getDefaultIndex: getDefaultIndex,
            setDefaultName: setDefaultName,
            getById: getById,
            createCacheSearch: createCacheSearch
        };
        return model;

        function createCacheSearch() {
            if (cache.length) {
                search_cache = utilsSvc.createObjByArrayIds(cache);
            } else {
                return getCurrency();
            }
        }

        function getById(id) {
            if (angular.isDefined(id)) {
                if (search_cache[id]) {
                    return search_cache[id];
                }
            }
        }

        function getCurrency() {
            if (cache.length) {
                return $q(function (resolve, reject) {
                    $timeout(function () {
                        resolve(cache);
                    }, 250);
                });
            } else {
                return http.get(url.currencies).then(function (res) {
                    cache = res;
                    createCacheSearch();
                    return res;
                });
            }
        }

        /**
         * @description Find in currency array item with name === name in parameters, if found - return index;
         * @param currencyName - name of currency, 'USD'
         * @param array - optional, array of currency if need, by default use cache array
         * @returns {number}
         */
        function getIndexByName(currencyName, array) {
            if (currencyName) {
                varfindArray = angular.isArray(array) ? array : cache;
                varcurrNameLwr = currencyName.toLowerCase();
                return findArray.findIndex(function (item) {
                    return item.abr && item.abr.toLowerCase() === currNameLwr;
                });
            }
            return 0;
        }

        function getDefaultIndex() {
            return getIndexByName(DEFAULT_CURR_NAME);
        }

        function setDefaultName(name) {
            if (name) {
                DEFAULT_CURR_NAME = name;
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