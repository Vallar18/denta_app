;(function () {
    'use strict';

    angular.module('service.phoneSvc', []).factory('phoneSvc', phoneSvc);

    phoneSvc.$inject = ['$ionicPopup','http','url', '$timeout'];

    function phoneSvc($ionicPopup,http,url,$timeout) {
        let DEFAULT_PHONE_CODE = '+380';
        let cache = [];
        let model = {
            showSelect: showSelect,
            getCodes: getCodes,
            getIndexByName: getIndexByName,
            getDefaultIndex: getDefaultIndex,
            setDefaultCode: setDefaultCode
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

        function getIndexByName(codeName,array){
            if(codeName){
                let findArray = angular.isArray(array) ? array : cache;
                let codeLower = codeName.toLowerCase();
                return findArray.findIndex(function(item){
                    return item.code && item.code.toLowerCase() === codeLower;
                })
            }
            return 0;
        }

        function getDefaultIndex(){
            return getIndexByName(DEFAULT_PHONE_CODE);
        }

        function setDefaultCode(code){
            if(code){
                DEFAULT_PHONE_CODE = code;
            }
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