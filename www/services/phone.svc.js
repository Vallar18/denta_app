;(function () {
    'use strict';

    angular.module('service.phoneSvc', []).factory('phoneSvc', phoneSvc);

    phoneSvc.$inject = ['$ionicPopup','http','url', '$timeout'];

    function phoneSvc($ionicPopup,http,url,$timeout) {
        let cache = [];
        let model = {
            showSelect: showSelect,
            getCodes: getCodes
        };
        return model;

        function getCodes() {
            // if (cache.length) {
            //     return $q.defer(function (resolve, reject) {
            //         $timeout(function(){
            //             resolve(cache);
            //         },150);
            //     });
            // } else {
                return http.get(url.codes).then(function (res) {
                    cache = res;
                    return res;
                });
            // }
        }

        function showSelect($scope){
            return $ionicPopup.show({
                templateUrl: 'components/code-select/code-select.html',
                scope: $scope,
                cssClass: 'select-code'
            });
        }
    }
})();