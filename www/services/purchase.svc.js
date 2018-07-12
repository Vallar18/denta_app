;(function () {
    'use strict';

    angular.module('service.purchaseSvc', []).factory('purchaseSvc', purchaseSvc);

    purchaseSvc.$inject = ['http', 'url', '$ionicLoading', '$ionicPopup', '$rootScope', 'messagesSvc'];

    function purchaseSvc(http, url, $ionicLoading, $ionicPopup, $rootScope, messagesSvc) {
        var tempProductIds = []; //user for search product ids id for sent to backend
        var popupInstance;
        var callbackBuySuccess;
        var callbackBuyError;
        var model = {
            loadProducts: loadProducts,
            buyProduct: buyProduct,
            getListProductId: getListProductId,
            selectSubcriptionPlan: selectSubcriptionPlan
        };


        $rootScope.$on('update_plan', function (event, data) {
            selectSubcriptionPlan();
        });

        return model;


        function selectPlan(item) {
            if (angular.isObject(item) && item.productId) {
                buyProduct(item);
            }
        }

        function selectSubcriptionPlan() {
            var scope = $rootScope.$new(true);
            scope.selectPlan = selectPlan;
            getListProductId().then(function (productIds) {
                // loadProducts(['android.test.purchased']).then(function (result) {
                if (angular.isArray(productIds)) {
                    loadProducts(productIds).then(function (result) {
                        if (angular.isArray(result)) {
                            scope.productItems = result;
                            popupInstance = $ionicPopup.show({
                                templateUrl: 'components/select-subscription/select-subscription.html',
                                cssClass: 'select-subscription',
                                title: '',
                                scope: scope,
                            });
                        }
                    });
                }
            });
        }

        function getListProductId() {
            return http.get(url.purchase.get).then(function (res) {
                if (angular.isArray(res)) {
                    tempProductIds = res;
                    var productIds = [];
                    res.forEach(function (val) {
                        if (val.productId) {
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
            if (window.ionic.Platform.isWebView() && angular.isDefined(window.inAppPurchase) && angular.isArray(productIds)) {
                return window.inAppPurchase.getProducts(productIds);
            }
        }

        function processSuccessBuy(product) {
            if (!product) return;
            var purchaseObj = product;
            tempProductIds.forEach(function (val) {
                if (product.productId === val.productId) {
                    purchaseObj.purchase_plans_id = val.id;
                }
            });
            return http.post(
                url.purchase.send,
                purchaseObj).then(function (res) {
                $ionicPopup.alert({
                    title: 'Purchase was successful!',
                    // template: 'Check your console log for the transaction data'
                });
                popupInstance.close();
                $ionicLoading.hide();
            });
        }

        function buyProduct(product) {
            if (window.ionic.Platform.isWebView() && angular.isDefined(window.inAppPurchase) && product) {
                window.inAppPurchase.subscribe(product.productId).then(function (data) {
                    console.log(JSON.stringify(data));
                    return window.inAppPurchase.consume(data.type, data.receipt, data.signature);
                }).then(function () {
                    processSuccessBuy(product);
                }).catch(function (err) {
                    $ionicLoading.hide();
                    console.log(err);
                    popupInstance.close();
                    errorPopup();
                });
            }
        }

        function errorPopup() {
            $ionicPopup.alert({
                title: 'Something went wrong',
                template: messagesSvc.error.buy
            });
        }
    }
})();