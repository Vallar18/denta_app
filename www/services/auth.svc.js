;(function () {
    'use strict';

    angular.module('service.authSvc', []).factory('authSvc', authSvc);

    authSvc.$inject = ['userSvc'];

    function authSvc(userSvc) {
        var model = {
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
    }
})();