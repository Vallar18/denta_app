;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewOneController', ViewOneController);

    ViewOneController.$inject = ['$state', '$timeout'];

    function ViewOneController($state, $timeout) {
        var vm = this;
        // vm.goView2 = goView2;
        vm.shangeScreen = shangeScreen;

        vm.item = {
            header: 'Gett Denta',
            subheader: 'Emergency all over the world',
            img: '',
            description: '',
            show: 0
        }
        let titleBlock = document.querySelector('.title-block');
        let back = document.querySelector('.back');
        function shangeScreen() {
            if(vm.item.show === 0){
                titleBlock.classList.add('mov-up');
                back.classList.add('mov-down');
                $timeout(function () {
                    vm.item = {
                        header: 'Gett Denta',
                        subheader: 'Welcome Aboard',
                        show: 1,
                        img: '',
                        description: 'lorem as;dlkf ;lalskjf ;laskdjf;laksjdf;lkjsd;lfkjs;dlfk a;lkjsd;lfkja slkdfj a;lskdj f;laskjd f;lkaj sd;lfj a' +
                        'a;sldk fj;alsk dj;aksj d;lfk jas;ldfj a;lsd jflaksjdf;lkas d; fkjasdl;k fjasl;dj f;lasjdfl;asj dl;fkja sdlkf alksd flkasj dfl;kja s' +
                        ' a;lsdkfj ;askdj ;laksjd f;lksjdflkja s;dlkjfas;lkdj f;lkasjd;llksj ;dfkja sldkjf ;alskdjf;kasjd;lfkja ;lkj '
                    }
                    back.classList.remove('mov-down');
                }, 2000);
            } else if(vm.item.show === 1){
                $state.go('login');
            }
        }
    }
})();