;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddCodeController', AddCodeController);

    AddCodeController.$inject = ['$state'];

    function AddCodeController($state) {
        const vm = this;
        // vm.send = send();
        console.log('code.controller')
        // $state.go('add-code')
    }

})();