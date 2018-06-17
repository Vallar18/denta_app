;(function () {
    'use strict';

    angular.module('service.phoneSvc', []).factory('phoneSvc', phoneSvc);

    phoneSvc.$inject = ['$ionicPopup','http','url'];

    function phoneSvc($ionicPopup,http,url) {
        let cache = [];
        let model = {
            showSelect: showSelect,
            getCodes: getCodes
        };
        return model;

        function getCodes() {
                if (cache.length) {
                    return $q.defer(function (resolve, reject) {
                        resolve(cache);
                    });
                } else {
                    return http.get(url.codes);
                }
        }

        function showSelect($scope){
            return $ionicPopup.show({
                templateUrl: 'components/code-select/code-select.html',
                scope: $scope,
            });
        }
    }
})();