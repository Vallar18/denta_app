;(function () {
    'use strict';

    angular
        .module('app',
            [   'factory.request',
                'factory.url',
                'app.core',
                'app.services',
                'app.factory',
                'app.directives',
            ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$state', 'utilsSvc'];

    function runBlock($ionicPlatform, $localStorage, $state, utilsSvc) {
        utilsSvc.initializePolyfill();
        $ionicPlatform.ready(function() {
            // $state.go('add-clinic');
            window.addEventListener('keyboardDidShow', (event) => {
                console.log(event.keyboardHeight);
                console.log('hello')
                let popup = document.querySelector('.popup');
                console.log(popup);
                if (popup != null){

                    console.log(typeof popup);
                    popup.classList.add('popup-bottom')
                }
            });
            window.addEventListener('keyboardDidHide', () => {
                let popup = document.querySelector('.popup');
                if(popup != null){
                    popup.classList.remove('popup-bottom')
                }
            });
            let showView = true;
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
            if(angular.isDefined($localStorage.valView)){
                showView = $localStorage.valView;
            }
            if(showView === true){
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
