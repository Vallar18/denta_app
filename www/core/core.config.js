;(function () {
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider',
        '$ionicConfigProvider', '$translateProvider', 'toastrConfig', '$mdGestureProvider'];

    // $mdGestureProvider'
    function mainConfig($stateProvider, $urlRouterProvider,
                        $ionicConfigProvider, $translateProvider, toastrConfig, $mdGestureProvider) {

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
            .state('view', {
                url: '/view',
                templateUrl: 'templates/view/view.html',
                controller: 'ViewCtrl',
                controllerAs: 'vm',
                cache: false
            })
            .state('add-phone', {
                url: '/add-phone',
                templateUrl: 'templates/add-phone/add-phone.html',
                controller: 'AddPhoneCtrl',
                controllerAs: 'vm',
                cache: false,
                reload: true,
                params: { phone: null },
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('add-code', {
                reload: true,
                url: '/add-code',
                templateUrl: 'templates/add-code/add-code.html',
                controller: 'AddCodeCtrl',
                controllerAs: 'vm',
                cache: false,
                params: { phone: null }
            })
            .state('select-role', {
                reload: true,
                url: '/select-role',
                templateUrl: 'templates/select-role/select-role.html',
                controller: 'SelectRoleCtrl',
                controllerAs: 'vm',
                cache: false,
            })
            .state('registration-dentist', {
                reload: true,
                url: '/registration-dentist',
                templateUrl: 'templates/reg-doc/reg-doc.html',
                controller: 'RegDocCtrl',
                controllerAs: 'vm',
                cache: false,
                params: {edit: null, become_den: null}
            })
            .state('registration-patient', {
                reload: true,
                url: '/registration-patient',
                templateUrl: 'templates/reg-pat/reg-pat.html',
                controller: 'RegPatCtrl',
                controllerAs: 'vm',
                cache: false,
                params: {edit: null}
            })
            .state('add-clinic', {
                reload: true,
                url: '/add-clinic',
                templateUrl: 'templates/add-clinic/add-clinic.html',
                controller: 'AddClinicCtrl',
                controllerAs: 'vm',
                cache: false,
                params: {edit: null, become_den: null},
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('add-specialities', {
                reload: true,
                url: '/add-specialities',
                templateUrl: 'templates/add-specialities/add-specialities.html',
                controller: 'AddSpecialitiesCtrl',
                controllerAs: 'vm',
                cache: false,
                params: {edit: null, become_den: null},
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
                reload: true,
                url: '/add-dentist-phone',
                templateUrl: 'templates/add-dentist-phone/add-dentist-phone.html',
                controller: 'AddDentistPhoneCtrl',
                controllerAs: 'vm',
                cache: false,
                params: {edit: null, c_invite: null, invite_for_den: null},
                resolve: {
                    codes: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('tabs', {
                url: '/tab',
                cache: false,
                abstract: true,
                controller: 'TabsController',
                controllerAs: 'vm',
                templateUrl: 'templates/tabs/tabs.html',
                resolve: {
                    //this need for generate cache
                    currencieItems: function (currencySvc) {
                        return currencySvc.getCurrency().then(function (res) {
                            return res;
                        });
                    }
                }
            })

            .state('tabs.geolocation', {
                reload: true,
                url: '/tabs/geo',
                cache: false,
                templateUrl: 'templates/geolocation/geo.html',
                controller: 'GeoCtrl',
                params: {clinic_id: null},
                controllerAs: 'vm'
            })

            .state('tabs.history', {
                reload: true,
                cache: false,
                url: '/history',
                templateUrl: 'templates/history/history.html',
                controller: 'HistoryCtrl',
                controllerAs: 'vm',
                resolve: {
                    emergItems: function (userSvc, historySvc) {
                        return historySvc.patient().then(function (res) {
                            if (!res.success) {
                                return [];
                            }
                            return res.data;
                        });
                    }
                }

            })
            .state('tabs.dentist-history', {
                reload: true,
                cache: false,
                url: '/history',
                templateUrl: 'templates/history/history.html',
                controller: 'HistoryCtrl',
                controllerAs: 'vm',
                resolve: {
                    emergItems: function (userSvc, historySvc) {
                        return historySvc.patient().then(function (res) {
                            if (!res.success) {
                                return [];
                            }
                            return res.data;
                        });
                    }
                }

            })
            .state('tabs.help', {
                reload: true,
                cache: false,
                url: '/help',
                templateUrl: 'templates/help/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm',
            })
            .state('tabs.dentist-help', {
                reload: true,
                cache: false,
                url: '/help',
                templateUrl: 'templates/help/help.html',
                controller: 'HelpCtrl',
                controllerAs: 'vm',
            })
            .state('tabs.patient-profile', {
                reload: true,
                cache: false,
                url: '/patient-profile',
                templateUrl: 'templates/patient-profile/patient-profile.html',
                controller: 'PatientProfileCtrl',
                controllerAs: 'vm'
            })
            .state('tabs.dentist-profile', {
                reload: true,
                cache: false,
                url: '/dentist-profile',
                templateUrl: 'templates/dentist-profile/dentist-profile.html',
                controller: 'DentistProfileCtrl',
                controllerAs: 'vm',
                params: {id: null},
                resolve: {
                    reviewItems: function (reviewSvc, userSvc, $stateParams) {
                        let config = {
                            user_id: userSvc.getUser().id,
                            // dentist_id: userSvc.getUser().dentist.id,
                            role_id: 1 //if i am dentist and view my review - need set role 1
                        };
                        if ($stateParams.id) {
                            config.dentist_id = $stateParams.id;
                        }
                        return reviewSvc.getItems(config).then(function (res) {
                            return res;
                        });
                    },
                    dentistProfile: function (userSvc, $stateParams) {
                        if ($stateParams.id) {
                            return userSvc.getUserInfoById($stateParams.id).then(function (res) {
                                if (res.user) {
                                    return res.user;
                                }
                            });
                        }
                    }
                }
            })
            .state('tabs.view-dentist-profile', {
                reload: true,
                cache: false,
                url: '/view-dentist-profile',
                templateUrl: 'templates/dentist-profile/dentist-profile.html',
                controller: 'DentistProfileCtrl',
                controllerAs: 'vm',
                params: {id: null},
                resolve: {
                    reviewItems: function (reviewSvc, userSvc, $stateParams) {
                        let config = {
                            user_id: userSvc.getUser().id,
                            role_id: 2 //if i am patient and view other dentist review - need set role 2
                        };
                        if ($stateParams.id) {
                            config.dentist_id = $stateParams.id;
                        }
                        return reviewSvc.getItems(config).then(function (res) {
                            return res;
                        });
                    },
                    dentistProfile: function (userSvc, $stateParams) {
                        if ($stateParams.id) {
                            return userSvc.getUserInfoById($stateParams.id).then(function (res) {
                                if (res.user) {
                                    return res.user;
                                }
                            });
                        }
                    }
                }
            })
            .state('tabs.my-patient', {
                reload: true,
                url: '/my-patient',
                templateUrl: 'templates/my-patient/my-patient.html',
                controller: 'MyPatientCtrl',
                controllerAs: 'vm',
                cache: false,
                resolve: {
                    codeItems: function (phoneSvc) {
                        return phoneSvc.getCodes().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('tabs.history-emergencies', {
                reload: true,
                url: '/history-emergencies',
                templateUrl: 'templates/history-emergencies/history-emergencies.html',
                controller: 'HistoryEmergenciesCtlr',
                controllerAs: 'vm',
                cache: false,
                resolve: {
                    emergItems: function (historySvc) {
                        return historySvc.dentist().then(function (res) {
                            if (res && res.success && res.data) {
                                return res.data;
                            } else {
                                return [];
                            }
                        });
                    }
                }
            })
            .state('tabs.history-patients', {
                reload: true,
                url: '/history-patients',
                templateUrl: 'templates/history-patients/history-patients.html',
                controller: 'HistoryPatientsCtlr',
                controllerAs: 'vm',
                cache: false,
                resolve: {
                    patientsItems: function (historySvc) {
                        return historySvc.dentistOwners().then(function (res) {
                            if (res && res.success && res.data) {
                                return res.data;
                            } else {
                                return [];
                            }
                        });
                    }
                }
            })
            .state('about', {
                reload: true,
                cache: false,
                url: '/about',
                templateUrl: 'templates/about/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            })
            .state('privacy', {
                reload: true,
                cache: false,
                url: '/privacy',
                templateUrl: 'templates/privacy/privacy.html',
                controller: 'PrivacyCtrl',
                controllerAs: 'vm'
            })
            .state('terms', {
                reload: true,
                cache: false,
                url: '/terms',
                templateUrl: 'templates/terms/terms.html',
                controller: 'TermsCtrl',
                controllerAs: 'vm'
            })
            .state('share', {
                reload: true,
                cache: false,
                url: '/share',
                templateUrl: 'templates/share/share.html',
                controller: 'ShareCtrl',
                controllerAs: 'vm'
            })
            .state('my-treatments', {
                reload: true,
                cache: false,
                url: '/my-treatments',
                templateUrl: 'templates/my-treatments/my-treatments.html',
                controller: 'MyTreatmentsCtrl',
                controllerAs: 'vm'
            })
            .state('need-dentist', {
                reload: true,
                cache: false,
                url: '/need-dentist',
                templateUrl: 'templates/need-dentist/need-dentist.html',
                controller: 'NeedDentistCtrl',
                controllerAs: 'vm'
            })

            .state('send-review', {
                reload: true,
                cache: false,
                url: '/send-review',
                templateUrl: 'templates/send-review/send-review.html',
                controller: 'SendReviewCtrl',
                controllerAs: 'vm',
                params: {emergencyId: null},
                resolve: {
                    questionItems: function (questionSvc) {
                        return questionSvc.getAll().then(function (res) {
                            if (res && res.length) {
                                return res;
                            } else {
                                return [];
                            }
                        });
                    },
                    currencieItems: function (currencySvc) {
                        return currencySvc.getCurrency().then(function (res) {
                            return res;
                        });
                    }
                }
            })
            .state('home', {
                reload: true,
                url: '/home',
                templateUrl: 'templates/homepage/homepage.html',
                controller: 'HomepageCtrl',
                controllerAs: 'vm'
            });
    }
})();