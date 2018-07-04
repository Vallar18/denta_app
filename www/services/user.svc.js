;(function () {
    'use strict';

    angular.module('service.userSvc', []).factory('userSvc', userSvc);

    userSvc.$inject = ['$localStorage', 'http', 'url'];

    function userSvc($localStorage, http, url) {
        var DOCTOR = 'Dentist';
        var PATIENT = 'Patient';
        var model = {
            getUserInfoById: getUserInfoById,
            getUser: getUser,
            getUserInfo: getUserInfo,
            setUser:setUser,
            delUser:delUser,
            updateUser:updateUser,
            setToken:setToken,
            getToken: getToken,
            setRole: setRole,
            getRole: getRole,
            updateUserRole: updateUserRole,
            isDoc: isDoc,
            isPat: isPat,
            resetData: resetData,
            roleConst: roleConst,
            setShowStart: setShowStart,
            isShowStart: isShowStart,
            isHaveDentist: isHaveDentist,
            getPatientDentist: getPatientDentist,
            getDeviceID: getDeviceID,
            setDeviceID: setDeviceID
        };
        return model;


        function getDeviceID(){
            if($localStorage.device_id){
                return $localStorage.device_id;
            }
        }

        function setDeviceID(id){
            if(angular.isDefined(id)){
                $localStorage.device_id = id;
            }
        }

        function setShowStart(isShow){
            if(angular.isDefined(isShow)){
                $localStorage.isShowStartPage = isShow;
            }
        }

        function isShowStart(){
            if(angular.isDefined($localStorage.isShowStartPage)){
                return $localStorage.isShowStartPage;
            }
            return true;
        }

        function getUser(){
            if($localStorage.user && $localStorage.user.id){
                return $localStorage.user;
            }
        }

        function getUserInfoById(id){
            return http.get(url.user.info + id );
        }

        function getUserInfo() {
            return http.get(url.user.id + '/' + $localStorage.user.id ).then(function(res){
                return res;
            });
        }

        function setUser(user){
            if(angular.isDefined(user)){
                $localStorage.user = angular.copy(user);
            }
        }

        function delUser(){
            $localStorage.user = null;
            delete $localStorage.user;
        }

        function updateUser(data) {
            return http.post(url.user.update, data);
        }

        function resetData(){
            $localStorage.user = null;
            $localStorage.token = null;
            $localStorage.role = null;
            $localStorage.device_id = null;
            delete $localStorage.user;
            delete $localStorage.token;
            delete $localStorage.role;
            delete $localStorage.device_id;
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

        function updateUserRole(data) {
            console.log(data);
            return http.post(url.user_role.update, data);
        }

        function isDoc(){
            return ($localStorage.role && $localStorage.role === DOCTOR);
        }

        function isPat(){
             return ($localStorage.role && $localStorage.role === PATIENT);
        }

        function roleConst() {
            return {
                doctor: DOCTOR,
                patient: PATIENT
            };
        }
        
        function isHaveDentist() {
            if ($localStorage.user){
                if($localStorage.user.dentists && $localStorage.user.dentists.length) {
                    return true;
                }
            } else{
                return false;
            }
        }

        function getPatientDentist() {
            if ($localStorage.user){
                if($localStorage.user.dentists) {
                    return $localStorage.user.dentists;
                }
            }
        }
    }
})();