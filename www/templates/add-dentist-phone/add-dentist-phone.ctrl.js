;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddDentistPhoneCtrl', AddDentistPhoneCtrl);

    AddDentistPhoneCtrlAddPhoneCtrl.$inject = ['$state', '$localStorage', 'regSvc', 'toastr', 'messagesSvc'];

    function AddDentistPhoneCtrl($state, $localStorage, regSvc, toastr, messagesSvc) {
        const vm = this;

    }

})();