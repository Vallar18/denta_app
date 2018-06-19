;(function () {
    'use strict';

    angular.module('service.authSvc', []).factory('authSvc', authSvc);

    authSvc.$inject = ['userSvc'];

    function authSvc(userSvc) {
        var model = {
            setCode: setCode,
            getCode: getCode,
            setKey: setKey,
            getKey: getKey,
            setPhone: getPhone,
            clearAuthData: clearAuthData,
            isLogined: isLogined,
            logout: logout
        };
        return model;


        function isLogined(){
            let user = userSvc.getUser();
            if(angular.isDefined(user) && user.id && userSvc.getToken() && userSvc.getRole()){
                return true;
            }
            return false;
        }

        function logout(){
            userSvc.resetData();
        }


        function clearAuthData(){
            $localStorage.code = null;
            $localStorage.key = null;
            $localStorage.phone = null;
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