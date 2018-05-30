;(function () {
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdGestureProvider', '$ionicConfigProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, $mdGestureProvider, $ionicConfigProvider) {

        $urlRouterProvider.otherwise('/view');
        $mdGestureProvider.skipClickHijack();
        $ionicConfigProvider.tabs.position('bottom'); // other values: top

        $stateProvider
        // .state('home', {
        //     url: '/home',
        //     templateUrl: 'templates/homepage/homepage.html',
        //     controller: 'HomepageController',
        //     controllerAs: 'vm'
        // })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('view', {
                url: '/view',
                templateUrl: 'templates/view/view.html',
                controller: 'ViewController',
                controllerAs: 'vm'
            })
            .state('add-phone', {
                url: '/add-phone',
                templateUrl: 'templates/add-phone/add-phone.html',
                controller: 'AddPhoneController',
                controllerAs: 'vm'
            })
            .state('add-code', {
                url: '/add-code',
                templateUrl: 'templates/add-code/add-code.html',
                controller: 'AddCodeController',
                controllerAs: 'vm'
            })
            .state('tabs', {
                cache: false,
                reload: true,
                url: '/tab',
                abstract: true,
                controller: 'TabsController',
                controllerAs: 'vm',
                templateUrl: 'templates/tabs/tabs.html'
            })

            // Ето пример как юзать табы !!!
            .state('tabs.homepage', {
                url: '/homepage',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageController',
                controllerAs: 'vm'
            })
        //
    }
})();