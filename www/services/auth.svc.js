;(function () {
    'use strict';

    angular.module('service.authSvc', []).factory('authSvc', authSvc);

    authSvc.$inject = ['userSvc', '$localStorage', '$state', '$ionicPlatform', '$ionicPopup', 'http', 'url', 'toastr'];

    function authSvc(userSvc, $localStorage, $state, $ionicPlatform, $ionicPopup, http, url, toastr) {
        const CODE_LENGTH = 4;
        let model = {
            setCode: setCode,
            getCode: getCode,
            setKey: setKey,
            getKey: getKey,
            setPhone: setPhone,
            getPhone: getPhone,
            clearAuthData: clearAuthData,
            isLogined: isLogined,
            logout: logout,
            getCountryId: getCountryId,
            setCountryId: setCountryId,
            processAutoLogin: processAutoLogin,
            addBackBehave: addBackBehave,
            isValidCode: isValidCode
        };
        return model;

        function isValidCode(code) {
            return code && code.toString().trim().length === CODE_LENGTH;
        }

        function processAutoLogin(callback) {
            if (isLogined()) {
                switch (userSvc.getRole()) {
                    case userSvc.roleConst().doctor:
                        $state.go('tabs.my-patient');
                        break;
                    case userSvc.roleConst().patient:
                        $state.go('tabs.help');
                        break;
                }
            }
            return callback && callback();
        }


        function setCountryId(id) {
            if (id) {
                $localStorage.country_id = id;
            }
        }

        function getCountryId() {
            if ($localStorage.country_id) {
                return $localStorage.country_id;
            }
        }


        function isLogined() {
            let user = userSvc.getUser();
            if (angular.isDefined(user) && user.id && userSvc.getToken() && userSvc.getRole() &&
                (user.patient || user.dentist)) {
                return true;
            }
            return false;
        }

        function logout() {
            if (userSvc.getDeviceID()) {
                http.post(url.logout.logout, {
                    device_id: userSvc.getDeviceID()
                }).then(function (res) {
                    clearAuthData();
                    userSvc.resetData();
                    $state.go('add-phone');
                });
            } else {
                clearAuthData();
                userSvc.resetData();
                $state.go('add-phone');
            }
            // ionic.Platform.exitApp();
        }


        function clearAuthData() {
            $localStorage.country_id = null;
            $localStorage.code = null;
            $localStorage.key = null;
            $localStorage.phone = null;
            delete $localStorage.country_id;
            delete $localStorage.code;
            delete $localStorage.key;
            delete $localStorage.phone;
        }

        function setCode(code) {
            if (angular.isDefined(code)) {
                $localStorage.code = code;
            }
        }

        function getCode() {
            if (angular.isDefined($localStorage.code)) {
                return $localStorage.code;
            }
        }

        function setKey(key) {
            if (angular.isDefined(key)) {
                $localStorage.key = key;
            }
        }

        function getKey() {
            if (angular.isDefined($localStorage.key)) {
                return $localStorage.key;
            }
        }

        function setPhone(phone) {
            if (angular.isDefined(phone)) {
                $localStorage.phone = phone;
            }
        }

        function getPhone() {
            if (angular.isDefined($localStorage.phone)) {
                return $localStorage.phone;
            }
        }

        function addBackBehave(edit) {
            if ($state.is('tabs.my-patient') || $state.is('tabs.help')){
                var exitApp = false, intval = setInterval(function (){exitApp = false;}, 2000);
            }
            $ionicPlatform.registerBackButtonAction(function () {
                if (!edit && ($state.is('add-dentist-phone') || $state.is('add-clinic') || $state.is('add-specialities') || $state.is('share'))) {
                    showBackPopup();
                } else if (edit) {
                    switch ($state.current.url) {
                        case '/registration-dentist':
                            $state.go('tabs.dentist-profile');
                            break;
                        case '/add-clinic':
                            $state.go('registration-dentist', {edit: true});
                            break;
                        case '/add-specialities':
                            $state.go('add-clinic', {edit: true});
                            break;
                        default:
                            window.history.back();
                    }
                } else if ($state.is('tabs.my-patient') || $state.is('tabs.help')) {
                    if (exitApp) {
                        clearInterval(intval)
                        (navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
                    }
                    else {
                        exitApp = true;
                        // setInterval(function () {
                        //     if(exitApp){
                        //         toastr.info('Press again to exit')
                        //     }
                        // }, 0);
                        return false;
                    }
                } else {
                    switch ($state.current.url) {
                        case '/add-phone':
                            (navigator.app && navigator.app.exitApp()) || (device && device.exitApp())
                            break;
                        case '/patient-profile':
                            $state.go('help');
                            break;
                        case '/dentist-profile':
                            $state.go('tabs.my-patient');
                            break;
                        default:
                            window.history.back();
                    }
                }
            }, 100);
        }

        // function removeBackBehave() {
        //     $ionicPlatform.registerBackButtonAction(function() {
        //         if(window.history.length){
        //             window.history.back()
        //         }else {
        //             let confirmPopup = $ionicPopup.confirm({
        //                 title: 'Confirm Exit',
        //                 template: "Are you sure you want to close Gett Dent?"
        //             });
        //             confirmPopup.then(function (close) {
        //                 if (close) {
        //                     // there is no back view, so close the app instead
        //                     ionic.Platform.exitApp();
        //                 } // otherwise do nothing
        //                 console.log("User canceled exit.");
        //             });
        //         }
        //     },100);
        // }

        function showBackPopup() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'You have not completed registration, would you like to go back to adding a phone?',
                cancelText: 'No',
                okText: 'Yes'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $state.go('add-phone');
                }
            });
        }


    }
})();