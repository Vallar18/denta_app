;(function () {
    'use string'

    angular
        .module('app')
        .controller('RegCtrl', RegCtrl);

    RegCtrl.$inject = ['$scope', '$ionicPlatform','$state', 'regSvc', 'toastr', '$localStorage', 'messagesSvc', '$ionicPopup', 'IonicClosePopupService', '$cordovaCamera'];

    function RegCtrl($scope, $ionicPlatform, $state, regSvc, toastr, $localStorage, messagesSvc, $ionicPopup, IonicClosePopupService, $cordovaCamera) {
        const vm = this;
        vm.send = send;
        vm.showContentDentist = undefined;
        vm.role = $localStorage.role;
        vm.phone = $localStorage.phone;
        vm.key = $localStorage.key;
        vm.croppedDataUrl = '';
        console.log(vm.key)
        vm.user = {
            name: '',
            lastname: '',
            email: '',
            phone: vm.phone,
            key: vm.key,
            avatar: ''
        };

        init();

        function init() {
            if(vm.role){
                if(vm.role === 'dentist'){
                    vm.showContentDentist = true;
                } else{
                    vm.showContentDentist = false;
                }
            }
            console.log(vm.showContentDentist)
        }

        function send() {
            if(validation()){
                if (!vm.showContentDentist){
                    delete vm.user.avatar;
                    console.log(vm.user)
                }
                regSvc.sendUser(vm.user).then(function (data) {
                    processRegSuccess(data);
                }, function (err) {
                   processRegError(err);
                });
            }
        }

        function processRegSuccess(data){
            if(data.success) {
                // toastr.success(data.message, '', {
                //     onHidden: function () {
                // }
                // });
                $localStorage.user = data.user;
                $localStorage.token = data.token;
                vm.user = {
                    name: '',
                    lastname: '',
                    email: '',
                    phone: vm.phone,
                    key: vm.key,
                    avatar: ''
                };
                if(vm.showContentDentist){
                    $state.go('add-clinic');
                } else {
                    $state.go('add-dentist-phone')
                }
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
             if(vm.showContentDentist){
                 if (!vm.user.avatar.length){
                     toastr.error(messagesSvc.error.emptyField);
                     return false;
                 }
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