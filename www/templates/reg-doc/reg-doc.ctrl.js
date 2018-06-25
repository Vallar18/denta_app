;(function () {
    'use strict'

    angular
        .module('app')
        .controller('RegDocCtrl', RegDocCtrl);

    RegDocCtrl.$inject = ['$scope', '$ionicPlatform','$state', '$stateParams', 'regSvc', 'toastr', 'authSvc', 'messagesSvc', '$ionicPopup', 'IonicClosePopupService', '$cordovaCamera','userSvc'];

    function RegDocCtrl($scope, $ionicPlatform, $state, $stateParams, regSvc, toastr, authSvc, messagesSvc, $ionicPopup, IonicClosePopupService, $cordovaCamera,userSvc) {
        const vm = this;
        vm.send = send;
        vm.phone = authSvc.getPhone();
        vm.key = authSvc.getKey();
        vm.edit = $stateParams.edit;
        vm.btn_text = 'Send';
        vm.croppedDataUrl = '';
        if(vm.edit){
            let user = userSvc.getUser();
            vm.btn_text = 'Update';
            vm.user = {
                name: user.name, lastname: user.lastname, email: user.email,
                user_id: user.id, avatar: user.avatar
            };
        } else{
            vm.user = {
                name: '', lastname: '', email: '',
                phone: vm.phone, key: vm.key, avatar: ''
            }
        };

        function send() {
            if(!validation()){

            }
            vm.user.country_id = authSvc.getCountryId();
            if (vm.edit) {
                userSvc.updateUser(vm.user).then(function (data) {
                    if (data.success) {
                        userSvc.getUserInfo().then(function (res) {
                            userSvc.setUser(res.user);
                            $state.go('add-clinic', {edit: true});
                        })
                    } else {
                        toastr.error(data.message);
                    }
                }, function (err) {
                    processRegError(err);
                });
            } else {
                regSvc.sendUser(vm.user).then(function (data) {
                    processRegSuccess(data);
                }, function (err) {
                   processRegError(err);
                });
            }
        }

        function processRegSuccess(data){
            if(data.success) {
                $state.go('add-clinic');
                userSvc.setUser(data.user);
                userSvc.setToken(data.token);
            } else {
                toastr.error(data.message);
            }
        }

        function processRegError(err){
            if(err.phone && angular.isArray(err.phone)){
                toastr.error(err.phone.reduce(function (acc, current) {
                    return acc + '\n' + current;
                }, ''))
            }
        }

        function validation() {
            if(vm.user.email === undefined){
                toastr.error(messagesSvc.error.invalidEmail);
                return false
            }
             if (vm.user.name === '' || vm.user.lastname === ''){
                 toastr.error(messagesSvc.error.emptyField);
                 return false;
             }
             if (!vm.user.avatar.length){
                 toastr.error(messagesSvc.error.emptyField);
                 return false;
             }
             return true;
        }

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
                $scope.picFile = imgBase;
                showChangeAvatar();
            })
        }
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
                            vm.user.avatar = vm.croppedDataUrl;
                            changeAvatar.close();
                        }
                    }
                ]
            });
        }

    }

})();