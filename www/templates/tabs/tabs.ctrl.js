;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', 'userSvc', 'tabsSvc','authSvc','textSvc','geoSvc'];

    function TabsController($state, $localStorage, userSvc,tabsSvc, authSvc,textSvc,geoSvc) {
        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.selectingItem = selectingItem;
        let currentUserType = userSvc.getRole();
        vm.menuModel = {
            isShow: false,
            items: [],
            model: undefined
        };
        vm.tabsModel = {
            isShowMenu: userSvc.isDoc(),
            items: []
        };

        init();
        function init() {
            vm.menuModel.items = tabsSvc.getMenuItems(currentUserType);
            vm.tabsModel.items = tabsSvc.getTabItems(currentUserType);
            geoSvc.watchPosition();
        }

        function toggleMenu() {
            vm.menuModel.isShow = !vm.menuModel.isShow;
        }

        function selectingItem(item) {
            toggleMenu();
            if (item.view) {
                $state.go(item.view);
            }
            if (item.act) {
                switch (item.act) {
                    case 'share':
                        share();
                        break;
                    case 'logout':
                        authSvc.logout();
                        break;
                }
            }
            vm.menuModel.model = null;
        }

        function share(){
            textSvc.share();
        }

    }
})();