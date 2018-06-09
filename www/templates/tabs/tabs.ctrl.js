;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', '$ionicHistory'];

    function TabsController($state, $localStorage, $ionicHistory) {

        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.selectingItem = selectingItem;
        vm.menuModel = {
            isShow: false,
            items: [],
            model: undefined
        };
        vm.tabsModel = {
            isShowMenu: true
        };

        init();
        function init(){
            vm.menuModel.items = [{
                id:1,
                name: 'Terms Of Use',
                view: 'terms'
            },{
                id:2,
                name: 'Privacy Police',
                view: 'privacy'
            },{
                id:3,
                name: 'About',
                view: 'about'
                }];
        }

        function toggleMenu(){
            vm.menuModel.isShow = !vm.menuModel.isShow;
        }

        function selectingItem(item){
            console.log(item);
            toggleMenu();
        }
    }
})();