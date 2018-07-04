;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PatientItemCtrl', PatientItemCtrl);

    PatientItemCtrl.$inject = ['$scope', '$ionicPopup', 'emergenciesSvc'];

    function PatientItemCtrl($scope, $ionicPopup, emergenciesSvc) {
        var vm = this;
        vm.photoItems = $scope.piPhotos || [];
        vm.emergencyItem = $scope.piItem;
        vm.openPopupList = function () {
            var popupList = $ionicPopup.show({
                templateUrl: 'components/photo-emergency/photo-emergency.html',
                title: 'Photo list',
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
            var arrBtn = [
                {
                    text: 'Hide',
                    type: 'button-default',
                }
            ];
            if (angular.isDefined(vm.emergencyItem.status) && vm.emergencyItem.status === 0) {
                arrBtn.push({
                    text: 'Add',
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
                var urlSplit = url.split("/");
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
                            text: 'Close',
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