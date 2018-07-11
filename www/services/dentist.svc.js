;(function () {
    'use strict';

    angular.module('service.dentistSvc', []).factory('dentistSvc', dentistSvc);

    dentistSvc.$inject = ['http', 'url', '$localStorage', '$ionicLoading', '$ionicPopup'];

    function dentistSvc(http, url, $localStorage, $ionicLoading, $ionicPopup) {
        var model = {
            invite: invite,
            updateClinic: updateClinic,
            checkDentistInvite: checkDentistInvite,
            addInviteDentist: addInviteDentist,
            // saveBecomeDenClinic: saveBecomeDenClinic,
            // getBecomeDenClinic: sgetBecomeDenClinic,
            sendBecomeDen: sendBecomeDen,
            loadProducts: loadProducts,
            buyProduct: buyProduct,
            getListProductId: getListProductId
        };
        return model;

        function getListProductId() {
            return http.get(url.purchase.get).then(function(res){
                if(angular.isArray(res)){
                    var productIds = [];
                    res.forEach(function(val){
                        if(val.productId){
                            productIds.push(val.productId);
                        }
                    });
                    return productIds;
                } else {
                    return [];
                }
            });
        }

        function loadProducts(productIds) {
            if (window.ionic.Platform.isWebView() && typeof window.inAppPurchase !== 'undefined' && angular.isArray(productIds)) {
                return window.inAppPurchase.getProducts(productIds);
            }
        }

        function buyProduct(productId) {
            if (window.ionic.Platform.isWebView() && typeof window.inAppPurchase !== 'undefined' && productId) {
                window.inAppPurchase.buy(productId).then(function (data) {
                    console.log(JSON.stringify(data));
                    console.log('consuming transactionId: ' + data.transactionId);
                    return window.inAppPurchase.consume(data.type, data.receipt, data.signature);
                }).then(function () {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Purchase was successful!',
                        // template: 'Check your console log for the transaction data'
                    });
                    console.log('consume done!');
                    $ionicLoading.hide();
                }).catch(function (err) {
                        $ionicLoading.hide();
                        console.log(err);
                        $ionicPopup.alert({
                            title: 'Something went wrong',
                            template: 'Check your console log for the error details'
                        });
                    });
            }
        }

        function invite(data) {
            return http.post(url.invite.dentist, data);
        }

        function checkDentistInvite(data) {
            return http.post(url.invite.checkDentist, data);
        }

        function updateClinic(data) {
            return http.post(url.clinic.update, data);
        }

        function addInviteDentist(data) {
            return http.post(url.relate.dentist, data)
        }

        // function saveBecomeDenClinic(clinic) {
        //     $localStorage.become_dentist_clinic = clinic;
        // }

        // function getBecomeDenClinic() {
        //     return $localStorage.become_dentist_clinic;
        // }
        function sendBecomeDen(data) {
            return http.post(url.user.become_dentist, data);
        }
    }
})();