;(function () {
    'use strict';

    angular.module('service.fcmSvc', []).factory('fcmSvc', fcmSvc);

    fcmSvc.$inject = ['http','url'];

    function fcmSvc(http, url) {
        var model = {
            subscribe: subscribe
        };
        return model;


        function subscribe() {
            if (typeof FCMPlugin !== 'undefined') {

                FCMPlugin.onNotification(function (data) {
                    console.log(data);
                    return http.post(url.subscribe, data);
                    // if (data.type == 'log' && data.status == 'emergency') {
                    //     let kids = angular.copy(userService.getKids());
                    //     for (let i = 0; i < kids.length; i++) {
                    //         if (kids[i].id == data.kid_id) {
                    //             $localStorage.log_index = i;
                    //             break;
                    //         }
                    //     }
                    //     toastr.error(String(data.message));     //red
                    //     $state.go('logs')
                    // } else if (data.type == 'log' && data.status == 'normal') {
                    //     toastr.success(String(data.message));   //green
                    //     // toastr.info(String(data.message));   //blue
                    // }
                })

            }
        }
    }
})();
