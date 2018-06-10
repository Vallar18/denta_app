;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', '$ionicHistory','$cordovaSocialSharing','$ionicPlatform'];

    function TabsController($state, $localStorage, $ionicHistory,$cordovaSocialSharing,$ionicPlatform) {

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

        function getMenuItems() {
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