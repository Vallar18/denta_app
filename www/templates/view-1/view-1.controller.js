;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewOneController', ViewOneController);

    ViewOneController.$inject = ['$state', '$timeout'];

    function ViewOneController($state, $timeout) {
        var vm = this;
        vm.shangeScreen = shangeScreen;

        var titleBlock = document.querySelector('.title-block');
        var back = document.querySelector('.back-block');
        vm.item = {
            header: 'Gett Denta',
            subheader: 'Emergency all over the world ',
            show: 0,
            description: ''
        }

        function shangeScreen() {
            if(vm.item.show === 0){
                back.classList.add('mov-down');
                $timeout(function () {
                    titleBlock.classList.add('mov-up');
                }, 1000)
                $timeout(function () {
                    vm.item = {
                        header: 'Gett Denta',
                        subheader: 'Welcome Aboard',
                        show: 1,
                        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur deserunt dolor doloremque dolorum iste iure labore libero natus nemo nesciunt quae quidem, repellendus sit soluta ullam voluptatibus! Consequatur, consequuntur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur deserunt dolor doloremque dolorum iste iure labore libero natus nemo nesciunt quae quidem, repellendus sit soluta ullam voluptatibus! Consequatur, consequuntur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequatur deserunt dolor doloremque dolorum iste iure labore libero natus nemo nesciunt quae quidem, repellendus sit soluta ullam voluptatibus! Consequatur, consequuntur.'
                    }
                    back.classList.remove('mov-down');
                    back.classList.add('back-block-2');
                }, 2300);
            } else if(vm.item.show === 1){
                $state.go('login');
            }
        }
    }
})();