;(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomepageCtrl', HomepageCtrl);

    HomepageCtrl.$inject = [];

    function HomepageCtrl() {

        var vm = this;

        // exit.buttonExit($state.current.url);
        // $ionicPlatform.registerBackButtonAction(function() {
        //     if($state.current.url === '/home'){
        //         var confirmPopup = $ionicPopup.confirm({
        //             title: $translate.instant('ExitApp'),
        //             template: $translate.instant('ExitApp2'),
        //             cancelText: $translate.instant('Cancel'),
        //             okText: $translate.instant('Yes'),
        //         });
        //         confirmPopup.then(function(res) {
        //             if (res) {
        //                 event.preventDefault();
        //                 navigator.app.exitApp();
        //
        //             }
        //         });
        //     } else {
        //         window.history.back();
        //     }
        // }, 100);
    }
})();