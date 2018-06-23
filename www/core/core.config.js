;(function () {
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$mdGestureProvider',
        '$ionicConfigProvider', '$translateProvider','toastrConfig'];

    function mainConfig($stateProvider, $urlRouterProvider, $mdGestureProvider,
                        $ionicConfigProvider, $translateProvider,toastrConfig) {

        angular.extend(toastrConfig, {
            // preventDuplicates: true,
            preventOpenDuplicates: true,
        });
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
        $urlRouterProvider.otherwise('/add-phone');
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
            .state('view', {
                url: '/view',
                templateUrl: 'templates/view/view.html',
                controller: 'ViewCtrl',
                controllerAs: 'vm'
            })
            .state('add-phone', {
                url: '/add-phone',
                templateUrl: 'templates/add-phone/add-phone.html',
                controller: 'AddPhoneCtrl',
                controllerAs: 'vm',
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('add-code', {
                url: '/add-code',
                templateUrl: 'templates/add-code/add-code.html',
                controller: 'AddCodeCtrl',
                controllerAs: 'vm'
            })
            .state('select-role', {
                url: '/select-role',
                templateUrl: 'templates/select-role/select-role.html',
                controller: 'SelectRoleCtrl',
                controllerAs: 'vm'
            })
            .state('registration-dentist', {
                url: '/registration-dentist',
                templateUrl: 'templates/reg-doc/reg-doc.html',
                controller: 'RegDocCtrl',
                controllerAs: 'vm',
                params: {edit: null}
            })
            .state('registration-patient', {
                url: '/registration-patient',
                templateUrl: 'templates/reg-pat/reg-pat.html',
                controller: 'RegPatCtrl',
                controllerAs: 'vm',
                params: {edit: null}
            })
            .state('add-clinic', {
                url: '/add-clinic',
                templateUrl: 'templates/add-clinic/add-clinic.html',
                controller: 'AddClinicCtrl',
                controllerAs: 'vm',
                params: {edit: null},
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                                return res;
                        });
                    }
                }
            })
            .state('add-specialities', {
                url: '/add-specialities',
                templateUrl: 'templates/add-specialities/add-specialities.html',
                controller: 'AddSpecialitiesCtrl',
                controllerAs: 'vm',
                params: {edit: null},
                resolve: {
                    spec: function (specSvc) {
                            return specSvc.getSpeciality().then(function (res) {
                                return res;
                            });
                    },
                    currencies: function (currencySvc) {
                        return currencySvc.getCurrency().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('add-dentist-phone', {
                url: '/add-dentist-phone',
                templateUrl: 'templates/add-dentist-phone/add-dentist-phone.html',
                controller: 'AddDentistPhoneCtrl',
                controllerAs: 'vm',
                params: {edit: null, c_invite: null},
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
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
                templateUrl: 'templates/history/history.html',
                controller: 'HistoryCtrl',
                controllerAs: 'vm',
                resolve: {
                    emergItems: function(userSvc,historySvc){
                        return historySvc.patient().then(function(res){
                            if(!res.success){
                                return [];
                            }
                            return res;
                        });
                    }
                }

            })
            .state('tabs.help', {
                url: '/help',
                templateUrl: 'templates/help/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm'

            })
            .state('tabs.patient-profile', {
                url: '/patient-profile',
                templateUrl: 'templates/patient-profile/patient-profile.html',
                controller: 'PatientProfileCtrl',
                controllerAs: 'vm'
            })
            .state('tabs.dentist-profile', {
                url: '/dentist-profile',
                templateUrl: 'templates/dentist-profile/dentist-profile.html',
                controller: 'DentistProfileCtrl',
                controllerAs: 'vm'
            })
            .state('tabs.my-patient', {
                url: '/my-patient',
                templateUrl: 'templates/my-patient/my-patient.html',
                controller: 'MyPatientCtrl',
                controllerAs: 'vm',
                resolve: {
                    codeItems: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('tabs.history-emergencies', {
                url: '/history-emergencies',
                templateUrl: 'templates/history-emergencies/history-emergencies.html',
                controller: 'HistoryEmergenciesCtlr',
                controllerAs: 'vm'
            })
            .state('tabs.history-patients', {
                url: '/history-patients',
                templateUrl: 'templates/history-patients/history-patients.html',
                controller: 'HistoryPatientsCtlr',
                controllerAs: 'vm'
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
            .state('my-treatments', {
                url: '/my-treatments',
                templateUrl: 'templates/my-treatments/my-treatments.html',
                controller: 'MyTreatmentsCtrl',
                controllerAs: 'vm'
            })
            .state('need-dentist', {
                url: '/need-dentist',
                templateUrl: 'templates/need-dentist/need-dentist.html',
                controller: 'NeedDentistCtrl',
                controllerAs: 'vm'
            })

            .state('send-review', {
                url: '/send-review',
                templateUrl: 'templates/send-review/send-review.html',
                controller: 'SendReviewCtrl',
                controllerAs: 'vm',
                resolve: {
                    currencieItems: function (currencySvc) {
                        return currencySvc.getCurrency().then(function (res) {
                            return res;
                        });
                    }
                }
            })

            .state('home', {
                url: '/home',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageCtrl',
                controllerAs: 'vm'
            })
        //
    }
})();