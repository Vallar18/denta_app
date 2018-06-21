;(function () {
    'use strict';

    angular.module('service.authSvc', []).factory('authSvc', authSvc);

    authSvc.$inject = ['userSvc', '$localStorage', '$state'];

    function authSvc(userSvc, $localStorage, $state) {
        var model = {
            setCode: setCode,
            getCode: getCode,
            setKey: setKey,
            getKey: getKey,
            setPhone: setPhone,
            getPhone: getPhone,
            clearAuthData: clearAuthData,
            isLogined: isLogined,
            logout: logout,
            getCountryId: getCountryId,
            setCountryId: setCountryId,
            processAutoLogin: processAutoLogin
        };
        return model;


        function  processAutoLogin(callback) {
            if(isLogined()) {
                switch(userSvc.getRole()){
                    case userSvc.roleConst().doctor:
                        $state.go('tabs.my-patient');
                        break;
                    case userSvc.roleConst().patient:
                        $state.go('tabs.help');
                        break;
                }
            }
            return callback && callback();
        }


        function setCountryId(id){
            if(id){
                $localStorage.country_id = id;
            }
        }

        function getCountryId(){
            if($localStorage.country_id){
                return $localStorage.country_id;
            }
        }


        function isLogined(){
            let user = userSvc.getUser();
            if(angular.isDefined(user) && user.id && userSvc.getToken() && userSvc.getRole()){
                return true;
            }
            return false;
        }

        function logout(){
            clearAuthData();
            userSvc.resetData();
            // ionic.Platform.exitApp();
            $state.go('view');
        }


        function clearAuthData(){
            $localStorage.country_id = null;
            $localStorage.code = null;
            $localStorage.country_id = null;
            $localStorage.key = null;
            $localStorage.phone = null;
            delete $localStorage.country_id;
            delete $localStorage.code;
            delete $localStorage.key;
            delete $localStorage.phone;
        }

        function setCode(code){
            if(angular.isDefined(code)){
                $localStorage.code = code;
            }
        }

        function getCode(){
            if(angular.isDefined($localStorage.code)){
                return $localStorage.code;
            }
        }

        function setKey(key){
            if(angular.isDefined(key)){
                $localStorage.key = key;
            }
        }

        function getKey(){
            if(angular.isDefined($localStorage.key)){
                return $localStorage.key;
            }
        }

        function setPhone(phone){
            if(angular.isDefined(phone)){
                $localStorage.phone = phone;
            }
        }

        function getPhone(){
            if(angular.isDefined($localStorage.phone)){
                return $localStorage.phone;
            }
        }
    }
})();