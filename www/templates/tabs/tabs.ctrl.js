;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TabsController', TabsController);

    TabsController.$inject = ['$state', '$localStorage', '$ionicHistory'];

    function TabsController($state, $localStorage, $ionicHistory) {

        var vm = this;
        vm.openSideMenu = function(){
            window.alert('test');
        }
        // vm.openEventsList = openEventsList;
        // vm.openShops = openShops;
        // vm.openAddProduct = openAddProduct;
        // vm.openNotifications = openNotifications;
        // vm.openUserProfile = openUserProfile;
        //
        // function openEventsList() {
        //     if ($state.current.url === '/events_list') {
        //         $state.reload();
        //     } else {
        //         $state.go('tabs.events_list');
        //     }
        // }
        //
        // function openShops() {
        //     if ($state.current.url === '/shops/:page') {
        //         $state.reload();
        //     } else {
        //         $state.go('tabs.shops');
        //     }
        // }
        //
        // function openAddProduct() {
        //     $state.go('tabs.add_product');
        // }
        //
        // function openNotifications() {
        //     $state.go('tabs.notifications');
        // }
        //
        // function openUserProfile() {
        //     if ($state.current.url === '/user_profile') {
        //         $state.go('tabs.user_profile', {aliens_id: $localStorage.user.id});
        //     } else {
        //         $state.go('tabs.user_profile');
        //     }
        // }
    }
})();