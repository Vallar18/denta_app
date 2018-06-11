;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', '$ionicModal', '$cordovaContacts', '$ionicPlatform','$cordovaCamera'];

        function HelpCtrl($scope, $ionicModal, $cordovaContacts, $ionicPlatform, $cordovaCamera) {
            var vm = this;

            vm.pickContactUsingNativeUI = function () {
                $ionicPlatform.ready(function () {
                    $cordovaContacts.pickContact().then(function (contactPicked) {
                        vm.phoneNumbers = contactPicked.phoneNumbers;
                    }, function (error) {

                    })
                });
            };

            vm.getCameraPic = function () {
                $ionicPlatform.ready(function () {
                    var options = {
                        quality: 100,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: false,
                        encodingType: Camera.EncodingType.JPEG,
                        // targetWidth: 100,
                        // targetHeight: 100,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: false,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        var image = document.getElementById('myImage');
                        image.src = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // error
                    });
                }, false);
            }


        }
    }
)();