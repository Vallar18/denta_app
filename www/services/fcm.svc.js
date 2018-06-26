;(function () {
    'use strict';

    angular.module('service.fcmSvc', []).factory('fcmSvc', fcmSvc);

    fcmSvc.$inject = ['http', 'url', 'toastr', 'messagesSvc'];

    function fcmSvc(http, url, toastr, messagesSvc) {
        let model = {
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            getToken: getToken,
            sendToken: sendToken,
            initialize: initialize,
            refreshToken: refreshToken
        };

        const FCM_CONFIG = {
            apiKey: "AIzaSyC6K6yHbUGRxDGKz9WmSgnOP4R83K5SSYM",
            authDomain: "my-projectdentte-1528234503301.firebaseapp.com",
            databaseURL: "https://my-projectdentte-1528234503301.firebaseio.com",
            projectId: "my-projectdentte-1528234503301",
            storageBucket: "my-projectdentte-1528234503301.appspot.com",
            messagingSenderId: "64881062287"
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
            return http.post(url.subscribe, data);
        }

        function refreshToken(callback) {
            if (angular.isDefined(FCMPlugin)) {
                // FCMPlugin.onTokenRefresh(function (token) {
                //     if (angular.isFunction(callback) && token) {
                //         callback(token);
                //     }
                // });
            }
        }

        function getToken(callback) {
            // if (angular.isDefined(FCMPlugin)) {
                // FCMPlugin.getToken(function (token) {
                //     if (angular.isFunction(callback) && token) {
                //         callback(token);
                //     }
                // });
            // }
        }

        function subscribe() {
            // if (angular.isDefined(FCMPlugin)) {
                // FCMPlugin.onNotification(function (data) {
                //     console.log(data);
                //     toastr.success(data);
                //     // if (data.type == 'log' && data.status == 'emergency') {
                //     //     let kids = angular.copy(userService.getKids());
                //     //     for (let i = 0; i < kids.length; i++) {
                //     //         if (kids[i].id == data.kid_id) {
                //     //             $localStorage.log_index = i;
                //     //             break;
                //     //         }
                //     //     }
                //     //     toastr.error(String(data.message));     //red
                //     //     $state.go('logs')
                //     // } else if (data.type == 'log' && data.status == 'normal') {
                //     //     toastr.success(String(data.message));   //green
                //     //     // toastr.info(String(data.message));   //blue
                //     // }
                // });
            // }
        }

        return model;
    }
})();
