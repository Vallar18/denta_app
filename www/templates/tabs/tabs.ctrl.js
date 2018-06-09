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

        function init() {
            vm.menuModel.items = getMenuItems();
        }

        function getMenuItems(){
            return [{
                id: 5,
                name: 'Terms Of Use',
                view: 'terms'
            }, {
                id: 6,
                name: 'Privacy Police',
                view: 'privacy'
            }, {
                id: 4,
                name: 'About',
                view: 'about'
            }, {
                id: 7,
                name: 'Log out',
                act: 'logout'
            }, {
                id: 1,
                name: 'Need a dentist',
                view: 'need-dentist'
            }, {
                id: 2,
                name: 'My treatments',
                view: 'my-treatments'
            }, {
                id: 3,
                name: 'Share with friends',
                act: 'share'
            }];
        }

        function toggleMenu() {
            vm.menuModel.isShow = !vm.menuModel.isShow;
        }

        function selectingItem(item) {
            toggleMenu();
            if (item.view) {
                $state.go(item.view);
            }
            vm.menuModel.model = null;
        }
    }
})();