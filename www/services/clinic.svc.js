;(function () {
    'use strict';

    angular.module('service.clinicSvc', []).factory('clinicSvc', clinicSvc);

    clinicSvc.$inject = ['http','url','$ionicLoading','$ionicPopup', 'geoSvc', 'toastr','messagesSvc'];

    function clinicSvc(http, url,$ionicLoading, $ionicPopup, geoSvc, toastr, messagesSvc) {
        var model = {
            getAll: getAll,
            getOne: getOne,
            // getClinicAddress: getClinicAddress
        };
        return model;

        // function getClinicAddress(callback){
        //     var mapPopup = $ionicPopup.show({
        //         templateUrl: 'components/google-maps/google-maps.html',
        //         scope: null,
        //         cssClass: 'google-maps-component',
        //         buttons: [
        //             {
        //                 text: 'Cancel',
        //                 onTap: function () {
        //                     $ionicLoading.hide();
        //                 }
        //             },
        //             {
        //                 text: '<b>OK</b>',
        //                 type: 'button-positive',
        //                 onTap: function(){
        //                     processMapPopupOK(callback);
        //                 }
        //             }
        //         ]
        //     });
        //     geoSvc.mapWithMarker();
        // }

        // function processMapPopupOK(callback) {
        //     $ionicLoading.hide();
        //     $ionicLoading.show({
        //         template: 'Obtaining an address...'
        //     });
        //     geoSvc.getAddress(geoSvc.getMarkerPosition(), function (res) {
        //         if (res.address.length && angular.isFunction(callback)) {
        //             callback(res);
        //         } else {
        //             toastr.error(messagesSvc.error().emptyAddress);
        //         }
        //         $ionicLoading.hide();
        //     }, function () {
        //         toastr.error(messagesSvc.error().emptyAddress);
        //         $ionicLoading.hide();
        //     });
        // }

        function getOne(id){
            return http.get(url.clinic.getOne + id);
        }

        function getAll(){
            return http.get(url.clinic.getAll);
        }
    }
})();