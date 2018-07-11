;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', 'userSvc', 'tabsSvc', 'authSvc', 'textSvc', 'geoSvc', 'fcmSvc', 'dentistSvc'];

    function TabsController($state, userSvc, tabsSvc, authSvc, textSvc, geoSvc, fcmSvc, dentistSvc) {
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
            if(!authSvc.isLogined()){
                authSvc.logout();
            }
            vm.menuModel.items = tabsSvc.getMenuItems(currentUserType);
            vm.tabsModel.items = tabsSvc.getTabItems(currentUserType);
            // geoSvc.watchPosition();
            sendFCMToken();
        }

        function sendFCMToken() {
            fcmSvc.getToken(function (data) {
                fcmSvc.sendToken(data).then(function () {
                    fcmSvc.subscribe();
                });
            });
        }

        function toggleMenu() {
            vm.menuModel.isShow = !vm.menuModel.isShow;
        }

        function selectingItem(item) {
            toggleMenu();
            if (item.view) {
                $state.go(item.view);
                let tab_active = document.querySelector('.tab-item-active');
                if(tab_active !== null) {
                   tab_active.classList.remove('tab-item-active');
                }
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

        function share() {
            textSvc.getShare();
        }

    }
})();