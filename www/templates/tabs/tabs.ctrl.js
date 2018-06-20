;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', 'userSvc', '$cordovaSocialSharing', '$ionicPlatform', 'tabsSvc'];

    function TabsController($state, $localStorage, userSvc, $cordovaSocialSharing, $ionicPlatform, tabsSvc) {

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
                        console.log('logout');
                        break;
                }
            }
            vm.menuModel.model = null;
        }

        function share() {
            $ionicPlatform.ready(function () {
                var message = 'Test messages';
                $cordovaSocialSharing
                    .share(message, null, null, null) // Share via native share sheet
                    .then(function (result) {
                        // Success!
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
            });
        }
    }
})();