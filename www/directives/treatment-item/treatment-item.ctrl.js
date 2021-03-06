;(function () {
    'use strict';

    angular
        .module('app')
        .controller('TreatmentItemCtrl', TreatmentItemCtrl);

    TreatmentItemCtrl.$inject = ['$scope', '$ionicPopup', '$cordovaCamera', '$ionicPlatform', 'IonicClosePopupService', 'emergenciesSvc', 'userSvc', '$ionicLoading', 'messagesSvc'];

    function TreatmentItemCtrl($scope, $ionicPopup, $cordovaCamera, $ionicPlatform, IonicClosePopupService, emergenciesSvc, userSvc, $ionicLoading, messagesSvc) {
        let vm = this;
        vm.photoItems = $scope.tiFiles || [];
        vm.emergencyItem = $scope.tiItem;
        vm.openPopupList = function () {
            var popupList = $ionicPopup.show({
                templateUrl: 'components/photo-emergency/photo-emergency.html',
                title: 'Photo list',
                cssClass: 'photo-emergency',
                subTitle: '',
                scope: $scope,
                buttons: getButtonForListPopup()
            });
        };

        function getButtonForListPopup() {
            let arrBtn = [
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
                });
            }
            return arrBtn;
        }

        vm.sendPhoto = function sendPhoto(photoStr64) {
            if (photoStr64) {
                $ionicLoading.show({
                    template: '<ion-spinner></ion-spinner> <br>Uploading photo...',
                });
                emergenciesSvc.addPhotos({
                    user_id: +userSvc.getUser().id,
                    emergency_id: +$scope.tiItem.id,
                    photos: [photoStr64]
                }).then(function (res) {
                    $ionicLoading.hide();
                    if (res.success && res.data && res.data.length && res.data[0].id && res.data[0].path) {
                        $scope.tiFiles.push({
                            id: res.data[0].id,
                            name: vm.getNameByUrl(res.data[0].path),
                            path: res.data[0].path
                        });
                    }
                });
            }
        };

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
                            text: 'Close',
                            type: 'button-default',
                            onTap: function (e) {
                            }
                        }
                    ]
                });
            }
        };

        vm.deletePhoto = function deletePhoto(item, $event) {
            if ($event) {
                $event.preventDefault();
                $event.stopProgressBar();
            }
            $ionicPopup.confirm({
                title: 'Delete photo',
                template: messagesSvc.quest.deletePhoto
            }).then(function (res) {
                if (res) {
                    if (item && item.id) {
                        emergenciesSvc.deletePhotos({
                            user_id: +userSvc.getUser().id,
                            emergency_id: +$scope.tiItem.id,
                            photos: [+item.id]
                        }).then(function (res) {
                            if (res && res.success) {
                                let indexDelete = vm.photoItems.findIndex(function (val) {
                                    return +val.id === +item.id;
                                });
                                vm.photoItems.splice(indexDelete, 1);
                            }
                        });
                    }
                }
            });
        };


        vm.getPic = function (type, callback) {
            var typeOfSource = type === 'open' ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
            $ionicPlatform.ready(function () {
                var options = {
                    quality: 90,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: typeOfSource,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    // targetWidth: 100,
                    // targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    var imgSrc = "data:image/jpeg;base64," + imageData;
                    if (callback) {
                        callback(imgSrc);
                    }
                }, function (err) {
                });
            }, false);
        };

        vm.openPopup = function () {
            var myPopup = $ionicPopup.show({
                template: '',
                title: 'Select photo source',
                subTitle: '',
                scope: $scope,
                buttons: [
                    {
                        text: 'Gallery',
                        type: 'button-default',
                        onTap: function (e) {
                            afterSelectImg('open');
                        }
                    },
                    {
                        text: 'Camera',
                        type: 'button-positive',
                        onTap: function (e) {
                            afterSelectImg('create');
                        }
                    }
                ]
            });
            IonicClosePopupService.register(myPopup);
        };

        function afterSelectImg(type) {
            vm.getPic(type, function (imgBase) {
                vm.sendPhoto(imgBase);
            });
        }

    }

})();