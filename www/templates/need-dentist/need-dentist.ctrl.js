;(function () {
    'use strict';

    angular
        .module('app')
        .controller('NeedDentistCtrl', NeedDentistCtrl);

    NeedDentistCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory'];

    function NeedDentistCtrl() {
        var vm = this;
    }
})();