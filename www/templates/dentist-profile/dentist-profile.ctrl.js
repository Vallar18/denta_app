;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DentistProfileCtrl', DentistProfileCtrl);

    DentistProfileCtrl.$inject = ['userSvc'];

    function DentistProfileCtrl(userSvc) {
        var vm = this;
        vm.country = 'Israel';
        vm.profile = userSvc.getUser();
        vm.test = [ {name: 'tdddd est'}, {name: 'tefg dfg st'},{name: 'tdf vfdv est'}, {name: 'gdfgdfgdfgdfg '},{name: 'test'}, {name: 'test'},{name: 'test'}, {name: 'test'}];

    }
})();