;(function () {
    'use string';

    angular
        .module('app')
        .controller('NeedDentistCtrl', NeedDentistCtrl);

    NeedDentistCtrl.$inject = ['$ionicPopup', '$scope', '$ionicHistory'];

    function NeedDentistCtrl() {
        const vm = this;
    }
})();