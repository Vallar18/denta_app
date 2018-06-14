;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', '$ionicHistory', '$cordovaSocialSharing', '$ionicPlatform', 'tabsSvc'];

    function TabsController($state, $localStorage, $ionicHistory, $cordovaSocialSharing, $ionicPlatform, tabsSvc) {

        var vm = this;
        vm.toggleMenu = toggleMenu;
        vm.selectingItem = selectingItem;
        vm.currentUserType = 'patient';
        vm.menuModel = {
            isShow: false,
            items: [],
            model: undefined
        };
        vm.tabsModel = {
            isShowMenu: vm.currentUserType === 'dentist',
            items: []
        };

        init();
        function init() {
            vm.menuModel.items = tabsSvc.getMenuItems(vm.currentUserType);
            vm.tabsModel.items = tabsSvc.getTabItems(vm.currentUserType);
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