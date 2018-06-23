;(function () {
    'use strict';

    angular.module('service.userSvc', []).factory('userSvc', userSvc);

    userSvc.$inject = ['$localStorage', 'http', 'url'];

    function userSvc($localStorage, http, url) {
        const DOCTOR = 'Dentist';
        const PATIENT = 'Patient';
        var model = {
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
            isPatientDentistBinding: isPatientDentistBinding,
            getPatientDentistBinding: getPatientDentistBinding
        };
        return model;

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
            delete $localStorage.user;
            delete $localStorage.token;
            delete $localStorage.role;
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
            }
        }
        
        function isPatientDentistBinding() {
            if ($localStorage.user.patient){
                if($localStorage.user.patient.dentists && $localStorage.user.patient.dentists.length) {
                    return true;
                }
            } else{
                return false;
            }
        }
        function getPatientDentistBinding() {
            if ($localStorage.user.patient){
                if($localStorage.user.patient.dentists) {
                    return $localStorage.user.patient.dentists;
                }
            }
        }
    }
})();