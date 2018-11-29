;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewCtrl', ViewCtrl);

    ViewCtrl.$inject = ['$state', '$timeout', 'textSvc','userSvc'];

    function ViewCtrl($state, $timeout, textSvc, userSvc) {
        var vm = this;
        vm.shangeScreen = shangeScreen;
        var titleBlock = document.querySelector('.title-block');
        var backEmpty = document.querySelector('.background-empty');
        vm.text_view = 'We are delighted that you have chosen to join GettDent. The only Dental app in the world that connects patient and doctors.\n' +
            'Travel fearlessly knowing that any dental emergency can be quickly resolved.\n' +
            'Let’s get started.';
        vm.change_view = 0;

        $timeout(function(){
            vm.shangeScreen();
        },1500);

        function shangeScreen() {
            if(vm.change_view === 0){
                backEmpty.classList.add('mov-down');
                $timeout(function () {
                    titleBlock.classList.add('mov-up');
                }, 1000);
                $timeout(function () {
                    vm.change_view =  1;
                    backEmpty.classList.remove('mov-down');
                    backEmpty.classList.add('background-content');
                }, 2300);
            } else if(vm.change_view === 1){
                userSvc.setShowStart(false);
                $state.go('add-phone');
            }
        }
    }
})();