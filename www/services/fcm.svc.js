;(function () {
    'use strict';

    angular.module('service.fcmSvc', []).factory('fcmSvc', fcmSvc);

    fcmSvc.$inject = ['http', 'url', 'toastr', 'messagesSvc', 'userSvc', '$ionicPlatform'];

    function fcmSvc(http, url, toastr, messagesSvc, userSvc, $ionicPlatform) {
        let model = {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getToken: getToken,
            sendToken: sendToken,
            initialize: initialize,
            refreshToken: refreshToken
        };

        const FCM_CONFIG = {
            apiKey: "AIzaSyCeg8mDXNt2Gcmrkry8EIqfst35eAH_oZM",
            authDomain: "gett-dent-second.firebaseapp.com",
            databaseURL: "https://gett-dent-second.firebaseio.com",
            projectId: "gett-dent-second",
            storageBucket: "gett-dent-second.appspot.com",
            messagingSenderId: "233345676904"
        };

        function initialize() {
            if (window.firebase && window.firebase.initializeApp) {
                window.firebase.initializeApp(FCM_CONFIG);
            } else {
                toastr.error(messagesSvc.error.fcm);
            }
        }

        function unsubscribe() {

        }

        function sendToken(data) {
            if (data) {
                userSvc.setDeviceID(data);
                return http.post(url.subscribe, {device_id: data});
            }
        }

        function refreshToken(callback) {
            if (typeof FCMPlugin !== 'undefined') {
                FCMPlugin.onTokenRefresh(function (token) {
                    if (angular.isFunction(callback) && token) {
                        callback(token);
                    }
                    sendToken(token);
                });
            }
        }

        function getToken(callback) {
            $ionicPlatform.ready(function () {
                if (typeof FCMPlugin !== 'undefined') {
                    FCMPlugin.getToken(function (token) {
                        if (angular.isFunction(callback) && token) {
                            callback(token);
                        }
                    });
                }
            });
        }

        function subscribe() {
            if (typeof FCMPlugin !== 'undefined') {
                refreshToken(); //add listener for refresh
                FCMPlugin.onNotification(function (data) {
                        console.log(data);
                        if (data.wasTapped) {
                            //Notification was received on device tray and tapped by the user.
                            toastr.success(data.body);
                        } else {
                            //Notification was received in foreground. Maybe the user needs to be notified.
                            toastr.success(data.body,null,{
                                timeOut: 60000
                            });
                        }
                    },
                    function (msg) {
                        // toastr.success(msg);
                    });
            }
        }

        return model;
    }
})();
