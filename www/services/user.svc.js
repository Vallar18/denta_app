;(function () {
    'use strict';

    angular.module('service.userSvc', []).factory('userSvc', userSvc);

    userSvc.$inject = ['$localStorage'];

    function userSvc($localStorage) {
        const DOCTOR = 'dentist';
        const PATIENT = 'patient';
        var model = {
            getUser: getUser,
            setUser:setUser,
            delUser:delUser,
            setToken:setToken,
            getToken: getToken,
            setRole: setRole,
            getRole: getRole,
            isDoc: isDoc,
            isPat: isPat,
            resetData: resetData
        };
        return model;

        function getUser(){
            // if($localStorage.user && $localStorage.id){ закоментирував бо не находили id
            if($localStorage.user){
                return $localStorage.user;
            }
        }

        function setUser(user){
            if(angular.isDefined(user)){
                $localStorage.user = angular.copy(user);
            }
        }

        function resetData(){
            $localStorage.user = null;
            $localStorage.token = null;
            $localStorage.role = null;
            delete $localStorage.user;
            delete $localStorage.token;
            delete $localStorage.role;

        }

        function delUser(){
            $localStorage.user = null;
            delete $localStorage.user;
        }

        function setToken(token){
            if(angular.isDefined(token)){
                $localStorage.token = token;
            }
        }

        function getToken(){
            return $localStorage.token || '';
        }

        function setRole(role){
            if(angular.isDefined(role)){
                $localStorage.role = role;
            }
        }

        function getRole(){
            if(angular.isDefined($localStorage.role)){
                return $localStorage.role;
            }
        }

        function isDoc(){
            return ($localStorage.role && $localStorage.role === DOCTOR);
        }

        function isPat(){
            return ($localStorage.role && $localStorage.role === PATIENT);
        }


    }
})();