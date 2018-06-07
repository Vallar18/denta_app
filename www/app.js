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
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$state'];

    function runBlock($ionicPlatform, $localStorage, $state) {
        $ionicPlatform.ready(function() {
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
    }
})();
