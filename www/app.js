;(function () {
    'use strict';

    angular
        .module('app',
            ['factory.request',
                'factory.url',
                'app.core',
                'app.services',
                'app.factory',
                'app.directives',
            ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$state', 'utilsSvc', 'authSvc','userSvc'];

    function runBlock($ionicPlatform, $state, utilsSvc, authSvc, userSvc) {
        utilsSvc.initializePolyfill();
        $ionicPlatform.ready(function () {
            // $state.go('add-clinic');
            window.addEventListener('keyboardDidShow', (event) => {
                let popup = document.querySelector('.popup');
                if (popup != null) {
                    popup.classList.add('popup-bottom')
                }
            });
            window.addEventListener('keyboardDidHide', () => {
                let popup = document.querySelector('.popup');
                if (popup != null) {
                    popup.classList.remove('popup-bottom')
                }
            });

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
            if (authSvc.isLogined()) {
                authSvc.processAutoLogin();
            } else if (userSvc.isShowStart()) {
                $state.go('view');
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
        //
        //             }
        //         });
        //     } else {
        //         window.history.back();
        //     }
        // }, 100);
    }
})();
