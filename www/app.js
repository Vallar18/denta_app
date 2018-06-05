;(function () {
    'use strict';

    angular
        .module('app',
            [
                'factory.request',
                'factory.url',
                'app.core',
                'app.services',
                'app.factory',
                'app.directives',
            ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform'];

    function runBlock($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
})();