;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientProfileCtrl', PatientProfileCtrl);

    PatientProfileCtrl.$inject = [];

    function PatientProfileCtrl() {

        var vm = this;
        vm.logout = function () {
            ionic.Platform.exitApp();
        };
        vm.profile = {
            name: 'Test Name Profile'
        }
    }
})();