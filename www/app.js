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
    runBlock.$inject = ['$ionicPlatform', '$state', 'utilsSvc', 'authSvc', 'userSvc', 'fcmSvc', '$timeout', '$ionicTabsDelegate', 'messagesSvc'];

    function runBlock($ionicPlatform, $state, utilsSvc, authSvc, userSvc, fcmSvc, $timeout, $ionicTabsDelegate, messagesSvc) {
        utilsSvc.initializePolyfill();
        messagesSvc.translateMessages();

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

        function addBehaverForKeyboard() {
            window.addEventListener('keyboardDidShow', function(event) {
                let popup = document.querySelector('.popup');
                if (popup != null) {
                    popup.classList.add('popup-bottom');
                }
                $ionicTabsDelegate.showBar(false);
            });
            window.addEventListener('keyboardDidHide', function(event){
                let popup = document.querySelector('.popup');
                if (popup != null) {
                    popup.classList.remove('popup-bottom');
                }
                $ionicTabsDelegate.showBar(true);
            });

            // window.addEventListener('keyboardDidShow', function(event) {
            //     let itemBlockTop = document.querySelector('.registration-item');
            //     if (itemBlockTop && itemBlockTop.style) {
            //         itemBlockTop.style.paddingTop = '100px';
            //     }
            // });
            // window.addEventListener('keyboardDidHide', function(event) {
            //     let itemBlockTop = document.querySelector('.registration-item');
            //     if (itemBlockTop && itemBlockTop.style) {
            //         itemBlockTop.style.paddingTop = '19vw';
            //     }
            // });
        }
    }
})();
