;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', 'userSvc', 'tabsSvc', 'authSvc', 'textSvc', 'geoSvc', 'fcmSvc', 'dentistSvc', 'purchaseSvc', '$translate'];

    function TabsController($state, userSvc, tabsSvc, authSvc, textSvc, geoSvc, fcmSvc, dentistSvc, purchaseSvc, $translate) {
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
        vm.translateArr = [];
        init();

        function init() {
            if (!authSvc.isLogined()) {
                authSvc.logout();
            }
            getTranslate();

            // geoSvc.watchPosition();
            sendFCMToken();
        }

        function getTranslate() {
            getTranslateIten('CONTENT.TEXT_MENU_TERMS');
            getTranslateIten('CONTENT.TEXT_MENU_PRIVACY');
            getTranslateIten('CONTENT.TEXT_MENU_ABOUT');
            getTranslateIten('CONTENT.TEXT_MENU_LOGOUT');
            getTranslateIten('CONTENT.TEXT_MENU_SUPPORT');
            getTranslateIten('CONTENT.TEXT_MENU_NEED_DENTIST');
            getTranslateIten('CONTENT.TEXT_MENU_TREATMENTS');
            getTranslateIten('CONTENT.TEXT_MENU_SHARE');
            getTranslateIten('CONTENT.TEXT_MENU_PATIENT');
            getTranslateIten('CONTENT.TEXT_MENU_PROFILE');
            getTranslateIten('CONTENT.TEXT_MENU_HISTORY');
            getTranslateIten('CONTENT.TEXT_MENU_HELP');
        }

        function getTranslateIten(path) {
            $translate(path).then(function (text) {
                vm.translateArr.push(text);
                if (path == 'CONTENT.TEXT_MENU_HELP') {
                    vm.menuModel.items = getMenuItems(currentUserType);
                    vm.tabsModel.items = getTabItems(currentUserType);
                }
            });
        }

        function getMenuItems(type) {
            if (angular.isUndefined(type) || type === userSvc.roleConst().doctor) {
                return [{
                    id: 5,
                    name: vm.translateArr[0] || 'Terms Of Use',
                    view: 'terms'
                }, {
                    id: 6,
                    name: vm.translateArr[1] || 'Privacy Police',
                    view: 'privacy'
                }, {
                    id: 4,
                    name: vm.translateArr[2] || 'About',
                    view: 'about'
                }, {
                    id: 8,
                    name: vm.translateArr[3] || 'Log out',
                    act: 'logout'
                }, {
                    id: 7,
                    name: vm.translateArr[4] || 'Support',
                    view: 'support'
                }, {
                    id: 1,
                    name: vm.translateArr[5] || 'Need a dentist',
                    view: 'tabs.dentist-help'
                }, {
                    id: 2,
                    name: vm.translateArr[6] || 'My treatments',
                    view: 'tabs.dentist-history'
                }, {
                    id: 3,
                    name: vm.translateArr[7] || 'Share with friends',
                    act: 'share'
                }];
            }
        }

        function getTabItems(type) {
            if (type === userSvc.roleConst().doctor) {
                return [
                    {
                        id: 1,
                        title: vm.translateArr[8] || 'Patient',
                        view: 'tabs.my-patient'
                    }, {
                        id: 2,
                        title: vm.translateArr[9] || 'Profile',
                        view: 'tabs.dentist-profile'
                    }, {
                        id: 3,
                        title: vm.translateArr[10] || 'History',
                        view: 'tabs.history-patients'
                    }
                ];
            } else if (type === userSvc.roleConst().patient) {
                return [
                    {
                        id: 1,
                        title: vm.translateArr[11] || 'Help',
                        view: 'tabs.help'
                    }, {
                        id: 2,
                        title: vm.translateArr[9] || 'Profile',
                        view: 'tabs.patient-profile'
                    }, {
                        id: 3,
                        title: vm.translateArr[10] || 'History',
                        view: 'tabs.history'
                    }
                ];
            }
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