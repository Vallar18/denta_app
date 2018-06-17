;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', '$ionicModal', '$cordovaContacts', '$ionicPlatform', '$cordovaCamera', '$ionicPopup','currencySvc'];

        function HelpCtrl($scope, $ionicModal, $cordovaContacts, $ionicPlatform, $cordovaCamera, $ionicPopup,currencySvc) {
            var vm = this;
            $scope.textModel = 'fffffffffffffffff';
            $scope.picFile = null;
            $scope.slideOpen = false;


            vm.helpArr = [
                {
                    id: 1,
                    doctor: {
                        id: 4,
                        name: 'Dr House'
                    },
                    price: 100,
                    rating: 2.8,
                    distance: '4.8 km',
                },
                {
                    id: 2,
                    doctor: {
                        id: 4,
                        name: 'Dr House2'
                    },
                    price: 100,
                    rating: 2.8,
                    distance: '4.8 km',
                },
                {
                    id: 3,
                    doctor: {
                        id: 4,
                        name: 'Dr House2'
                    },
                    price: 100,
                    rating: 2.8,
                    distance: '4.8 km',
                },
            ];

            vm.reviewArr = [
                {
                   id:1,
                    date: '12 03 1093',
                    rating: 4,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
                },
                {
                    id:2,
                    date: '12 03 1093',
                    rating: 4,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
                },
                {
                    id:3,
                    date: '12 03 1093',
                    rating: 4,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
                },
            ];

            vm.pickContactUsingNativeUI = function () {
                $ionicPlatform.ready(function () {
                    $cordovaContacts.pickContact().then(function (contactPicked) {
                        vm.phoneNumbers = contactPicked.phoneNumbers;
                    }, function (error) {

                    })
                });
            };

            vm.getPic = function (type, callback) {
                var typeOfSource = type === 'open' ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA;
                $ionicPlatform.ready(function () {
                    var options = {
                        quality: 85,
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

            //--------------- select avatar question --------------------
            vm.selectAvatar = function () {
                var myPopup = $ionicPopup.show({
                    template: '',
                    title: 'Select photo source',
                    subTitle: '',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Open',
                            type: 'button-default',
                            onTap: function (e) {
                                afterSelectImg('open');
                            }
                        },
                        {
                            text: 'Create',
                            type: 'button-positive',
                            onTap: function (e) {
                                afterSelectImg('create');
                            }
                        }
                    ]
                });
            };

            function afterSelectImg(type) {
                vm.getPic(type, function (imgBase) {
                    $scope.picFile = imgBase;
                    showChangeAvatar();
                })
            }

            //-------------------------------------------------------------


            //---------------------- modal ----------------------------------
            function showChangeAvatar() {
                var changeAvatar = $ionicPopup.show({
                    templateUrl: 'components/create-avatar/create-avatar.html',
                    title: 'Select avatar crop',
                    subTitle: '',
                    cssClass: 'create-avatar',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Cancel',
                            type: 'button-default',
                            onTap: function (e) {
                                changeAvatar.close();
                            }
                        },
                        {
                            text: 'OK',
                            type: 'button-positive',
                            onTap: function (e) {
                                changeAvatar.close();
                            }
                        }
                    ]
                });
            }

            //-----------------------------------------------------------------
        }
    }
)();