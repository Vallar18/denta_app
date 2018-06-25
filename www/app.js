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

        let config = {
            apiKey: "AIzaSyAWpF6pDuItLrxcA1GAf6pb7ZE1-ccm-DU",
            authDomain: "denta-app-testing.firebaseapp.com",
            databaseURL: "https://denta-app-testing.firebaseio.com",
            projectId: "denta-app-testing",
            storageBucket: "denta-app-testing.appspot.com",
            messagingSenderId: "117305701018"
        };

        if(window.firebase){
            window.firebase.initializeApp(config);
        }

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
