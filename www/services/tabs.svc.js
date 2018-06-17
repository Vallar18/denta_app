;(function () {
    'use strict';

    angular.module('service.tabsSvc', []).factory('tabsSvc', tabsSvc);

    tabsSvc.$inject = [];

    function tabsSvc() {
        var model = {
            getMenuItems: getMenuItems,
            getTabItems: getTabItems
        };
        return model;

        function getMenuItems(type) {
            if (angular.isUndefined(type) || type === 'dentist') {
                return [{
                    id: 5,
                    name: 'Terms Of Use',
                    view: 'terms'
                }, {
                    id: 6,
                    name: 'Privacy Police',
                    view: 'privacy'
                }, {
                    id: 4,
                    name: 'About',
                    view: 'about'
                }, {
                    id: 7,
                    name: 'Log out',
                    act: 'logout'
                }, {
                    id: 1,
                    name: 'Need a dentist',
                    view: 'need-dentist'
                }, {
                    id: 2,
                    name: 'My treatments',
                    view: 'my-treatments'
                }, {
                    id: 3,
                    name: 'Share with friends',
                    act: 'share'
                }];
            }
        }

        function getTabItems(type) {
            if (type === 'dentist') {
                return [
                    {
                        id: 1,
                        title: 'Patient',
                        view: 'tabs.my-patient'
                    }, {
                        id: 2,
                        title: 'Profile',
                        view: 'tabs.dentist-profile'
                    }, {
                        id: 3,
                        title: 'History',
                        view: 'tabs.history'
                    }
                ]
            } else if (type === 'patient') {
                return [
                    {
                        id: 1,
                        title: 'Help',
                        view: 'tabs.help'
                    }, {
                        id: 2,
                        title: 'Profile',
                        view: 'tabs.patient-profile'
                    }, {
                        id: 3,
                        title: 'History',
                        view: 'tabs.history'
                    }
                ]
            }
        }
    }
})();