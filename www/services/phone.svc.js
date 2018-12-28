;(function () {
    'use strict';

    angular.module('service.phoneSvc', []).factory('phoneSvc', phoneSvc);

    phoneSvc.$inject = ['$ionicPopup','http','url', '$timeout','$q'];

    function phoneSvc($ionicPopup,http,url,$timeout,$q) {
        // let DEFAULT_PHONE_CODE = '+1';
        let DEFAULT_COUNTRY = 'Canada';
        let cache = [];
        let model = {
            showSelect: showSelect,
            getCodes: getCodes,
            getIndexByName: getIndexByName,
            getDefaultIndex: getDefaultIndex,
            setDefaultCountry: setDefaultCountry,
            validatePhone: validatePhone,
            preparePhone: preparePhone,
            cutNumberCode: cutNumberCode,
            clearPhone: clearPhone
        };
        return model;

        function clearPhone(phone){
            return +phone.replace(/\D/g, '');
        }

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
                return $q.when(cache);
            } else {
                return http.get(url.codes).then(function (res) {
                    cache = res;
                    return res;
                });
            }
        }

        // function getIndexByName(codeName,array){
        //     if(codeName){
        //         let findArray = angular.isArray(array) ? array : cache;
        //         let codeLower = codeName.toLowerCase();
        //         return findArray.findIndex(function(item){
        //             return item.code && item.code.toLowerCase() === codeLower;
        //         });
        //     }
        //     return 0;
        // }
        //
        // function getDefaultIndex(){
        //     return getIndexByName(DEFAULT_PHONE_CODE);
        // }

        function getIndexByName(countryName,array){
            if(countryName){
                let findArray = angular.isArray(array) ? array : cache;
                let nameLower = countryName.toLowerCase();
                return findArray.findIndex(function(item){
                    return item.name && item.name.toLowerCase() === nameLower;
                });
            }
            return 0;
        }

        function getDefaultIndex(){
            return getIndexByName(DEFAULT_COUNTRY);
        }

        function setDefaultCountry(country){
            if(country){
                DEFAULT_COUNTRY = country;
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