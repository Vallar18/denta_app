;(function () {
    'use strict';

    angular.module('app',
        ['factory.request',
            'factory.url',
            'app.core',
            'app.services',
            'app.factory',
            'app.directives',
            'app.filters'
        ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$state', 'utilsSvc', 'authSvc', 'userSvc', 'fcmSvc', '$timeout', '$ionicTabsDelegate'];

    function runBlock($ionicPlatform, $state, utilsSvc, authSvc, userSvc, fcmSvc, $timeout, $ionicTabsDelegate) {
        utilsSvc.initializePolyfill();


        $ionicPlatform.ready(function () {
            if (authSvc.isLogined()) {
                authSvc.processAutoLogin();
            } else if (userSvc.isShowStart()) {
                $state.go('view');
            }
            fcmSvc.initialize();
            if (window.StatusBar) {
                window.styleDefault();
            }
            addBehaverForKeyboard();
        });



        // function addBehaverForKeyboard() {
        //     window.addEventListener('keyboardDidShow', (event) => {
        //         let popup = document.querySelector('.popup');
        //         if (popup != null) {
        //             popup.classList.add('popup-bottom');
        //         }
        //         $ionicTabsDelegate.showBar(false);
        //     });
        //     window.addEventListener('keyboardDidHide', () => {
        //         let popup = document.querySelector('.popup');
        //         if (popup != null) {
        //             popup.classList.remove('popup-bottom');
        //         }
        //         $ionicTabsDelegate.showBar(true);
        //     });



        // ----  на иос не нада --- //

        window.addEventListener('keyboardDidShow', (event) => {
            let itemBlockTop = document.querySelector('.registration-item');
            if (itemBlockTop && itemBlockTop.style) {
                itemBlockTop.style.paddingTop = 0;
            }
        });
        window.addEventListener('keyboardDidHide', () => {
            let itemBlockTop = document.querySelector('.registration-item');
            if (itemBlockTop && itemBlockTop.style) {
                itemBlockTop.style.paddingTop = '19vw';
            }
        });

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
        //             }
        //         });
        //     } else {
        //         window.history.back();
        //     }
        // }, 100);
    }
})();
