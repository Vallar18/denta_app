;(function () {
    'use strict';

    angular.module('service.phoneSvc', []).factory('phoneSvc', phoneSvc);

    phoneSvc.$inject = ['$ionicPopup','http','url', '$timeout','$q'];

    function phoneSvc($ionicPopup,http,url,$timeout,$q) {
        let DEFAULT_PHONE_CODE = '+380';
        let cache = [];
        let model = {
            showSelect: showSelect,
            getCodes: getCodes,
            getIndexByName: getIndexByName,
            getDefaultIndex: getDefaultIndex,
            setDefaultCode: setDefaultCode,
            validatePhone: validatePhone,
            preparePhone: preparePhone,
            cutNumberCode: cutNumberCode
        };
        return model;

        function preparePhone(code,phone){
            return (code || '+0') + ((phone || '') + '');
        }

        function validatePhone(phone){
            if(angular.isDefined(phone)){
                return (phone.length > 8 && phone.length < 20);
            }
            return false;
        }

        function getCodes() {
            if (cache.length) {
                return $q(function (resolve, reject) {
                    $timeout(function(){
                        resolve(cache);
                    },250);
                });
            } else {
                return http.get(url.codes).then(function (res) {
                    cache = res;
                    return res;
                });
            }
        }

        function getIndexByName(codeName,array){
            if(codeName){
                let findArray = angular.isArray(array) ? array : cache;
                let codeLower = codeName.toLowerCase();
                return findArray.findIndex(function(item){
                    return item.code && item.code.toLowerCase() === codeLower;
                });
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

        function cutNumberCode(number, codes) {
            if(number){
                let prepare_number = number.replace(/\s/g, '');
                if (prepare_number.length){
                    return +prepare_number;
                }
            }
        }
    }
})();