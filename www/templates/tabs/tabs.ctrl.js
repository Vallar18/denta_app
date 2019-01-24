;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', 'userSvc', 'tabsSvc', 'authSvc', 'textSvc', 'geoSvc', 'fcmSvc', 'dentistSvc', 'purchaseSvc'];

    function TabsController($state, userSvc, tabsSvc, authSvc, textSvc, geoSvc, fcmSvc, dentistSvc, purchaseSvc) {
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
            if (!authSvc.isLogined()) {
                authSvc.logout();
            }
            if (angular.isUndefined(type) || type === userSvc.roleConst().doctor) {
                vm.menuModel.items = [{
                    id: 5,
                    name: 'ASD',
                    view: 'terms'
                }, {
                    id: 6,
                    name: 'ASDF',
                    view: 'privacy'
                }, {
                    id: 4,
                    name: 'ASDF',
                    view: 'about'
                }, {
                    id: 8,
                    name: 'ASDF',
                    act: 'logout'
                }, {
                    id: 7,
                    name: 'ASD',
                    view: 'support'
                }, {
                    id: 1,
                    name: 'Need a dentist',
                    view: 'tabs.dentist-help'
                }, {
                    id: 2,
                    name: 'My treatments',
                    view: 'tabs.dentist-history'
                }, {
                    id: 3,
                    name: 'Share with friends',
                    act: 'share'
                }];
            }
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
                if (tab_active !== null) {
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