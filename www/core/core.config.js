;(function () {
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdGestureProvider',
        '$ionicConfigProvider', '$translateProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, $mdGestureProvider,
                        $ionicConfigProvider, $translateProvider) {
        //example of user translation
        $translateProvider.translations('en', {
            'TITLE': 'Hello',
            'FOO': 'This is a paragraph'
        });
        $translateProvider.translations('de', {
            'TITLE': 'Hallo',
            'FOO': 'Dies ist ein Absatz'
        });
        $translateProvider.preferredLanguage('en');
        //----------------------------------
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

            .state('geolocation', {
                url: '/geo',
                templateUrl: 'templates/geolocation/geo.html',
                controller: 'GeoCtrl',
                controllerAs: 'vm'
            })

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
            .state('select-role', {
                url: '/select-role',
                templateUrl: 'templates/select-role/select-role.html',
                controller: 'SelectRoleController',
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

            .state('tabs.history', {
                url: '/history',
                views: {
                    'history-tab': {
                        templateUrl: 'templates/homepage/homepage.html',
                        controller: 'HomepageController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tabs.help', {
                url: '/help',
                views: {
                    'help-tab': {
                        templateUrl: 'templates/help/help.html',
                        controller: 'HelpCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('tabs.profile', {
                url: '/profile',
                views: {
                    'profile-tab': {
                        templateUrl: 'templates/profile/profile.html',
                        controller: 'ProfileCtrl',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            })

            .state('privacy', {
                url: '/privacy',
                templateUrl: 'templates/privacy/privacy.html',
                controller: 'PrivacyCtrl',
                controllerAs: 'vm'
            })

            .state('terms', {
                url: '/terms',
                templateUrl: 'templates/terms/terms.html',
                controller: 'TermsCtrl',
                controllerAs: 'vm'
            })

            .state('share', {
                url: '/share',
                templateUrl: 'templates/share/share.html',
                controller: 'ShareCtrl',
                controllerAs: 'vm'
            })

        //
    }
})();