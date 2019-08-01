;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientItemCtrl', PatientItemCtrl);

    PatientItemCtrl.$inject = ['$scope', '$ionicPopup', 'emergenciesSvc', '$translate'];

    function PatientItemCtrl($scope, $ionicPopup, emergenciesSvc, $translate) {
        let vm = this;
        vm.photoItems = $scope.piPhotos || [];
        vm.emergencyItem = $scope.piItem;
        init();

        function init() {
            $translate('CONTENT.BTN_POPUP_HIDE').then(function (text) {
                $scope.btn_hide = text;
            });
            $translate('CONTENT.BTN_POPUP_ADD').then(function (text) {
                $scope.btn_add = text;
            });
            $translate('CONTENT.BTN_POPUP_CLOSE').then(function (text) {
                $scope.btn_close = text;
            });
            $translate('CONTENT.TEXT_PHOTO_LIST').then(function (text) {
                $scope.text_list = text;
            });
        }

        vm.openPopupList = function () {
            var popupList = $ionicPopup.show({
                templateUrl: 'components/photo-emergency/photo-emergency.html',
                title: $scope.text_list || 'Photo list',
                cssClass: 'photo-emergency',
                subTitle: '',
                scope: $scope,
                buttons: getButtonForListPopup()
            });
            if (vm.emergencyItem && vm.emergencyItem.id && vm.emergencyItem.new && +vm.emergencyItem.new === 1) {
                emergenciesSvc.changeToViewed({
                    emergency_id: vm.emergencyItem.id
                }).then(function(res){
                    if(res && res.success){
                        vm.emergencyItem.new = 0;
                    }
                });
            }
        };

        function getButtonForListPopup() {
            let arrBtn = [
                {
                    text:  $scope.btn_hide || 'Hide',
                    type: 'button-default',
                }
            ];
            if (angular.isDefined(vm.emergencyItem.status) && vm.emergencyItem.status === 0) {
                arrBtn.push({
                    text:  $scope.btn_add || 'Add',
                    type: 'button-positive',
                    onTap: function (e) {
                        e.preventDefault();
                        vm.openPopup();
                    }
                })
            }
            return arrBtn;
        }

        vm.getNameByUrl = function (url) {
            if (url) {
                let urlSplit = url.split("/");
                if (urlSplit.length) {
                    return urlSplit.pop();
                }
            }
            return url;
        };

        vm.viewPhoto = function (item) {
            if (item && item.path) {
                vm.imageSourceForView = item.path;
                $ionicPopup.show({
                    templateUrl: 'components/photo-viewer/photo-viewer.html',
                    scope: $scope,
                    cssClass: 'photo-viewer',
                    buttons: [
                        {
                            text:  $scope.btn_close || 'Close',
                            type: 'button-default',
                            onTap: function (e) {
                            }
                        }
                    ]
                });
            }
        };
    }

})();