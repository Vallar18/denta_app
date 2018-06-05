;(function () {
    'use strict';

    angular
        .module('app')
        .controller('ViewController', ViewController);

    ViewController.$inject = ['$state', '$timeout'];

    function ViewController($state, $timeout) {
        var vm = this;
        vm.shangeScreen = shangeScreen;

        $state.go('geolocation');

        var titleBlock = document.querySelector('.title-block');
        var backEmpty = document.querySelector('.background-empty');
        vm.item = {
            title: 'Emergency all over the world ',
            show: 0,
            description: ''
        }

        function shangeScreen() {
            if(vm.item.show === 0){
                backEmpty.classList.add('mov-down');
                $timeout(function () {
                    titleBlock.classList.add('mov-up');
                }, 1000)
                $timeout(function () {
                    vm.item = {
                        title: 'Welcome aboard',
                        show: 1,
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis gravida risus, vitae semper libero malesuada nec. Duis sagittis purus suscipit odio scelerisque viverra. Etiam consectetur imperdiet dui vitae pulvinar. Curabitur sit amet risus ut justo bibendum ullamcorper. Donec erat ante, vulputate quis augue id, rhoncus venenatis lacus. Cras quis vestibulum arcu.Maecenas faucibus nisl in massa malesuada, id vestibulum mi pellentesque. In in libero ut nulla viverra vestibulum at nec nunc. Aliquam porttitor metus vel pulvinar imperdiet. Suspendisse urna est, tristique facilisis gravida at, porta sed lacus. Vestibulum faucibus nisi quis erat molestie viverra sed non enim. Etiam faucibus, massa eget porta porttitor, quam mi blandit urna, pretium tincidunt enim augue ut nisi. Donec aliquet justo nec justo facilisis, eget tincidunt nisi ultrices. Mauris dignissim orci eget felis '
                    }
                    backEmpty.classList.remove('mov-down');
                    backEmpty.classList.add('background-content');
                }, 2300);
            } else if(vm.item.show === 1){
                $state.go('add-phone');
            }
        }
    }
})();