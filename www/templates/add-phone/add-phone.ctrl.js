;(function () {
    'use strict'

    angular
        .module('app')
        .controller('AddPhoneCtrl', AddPhoneCtrl);

    AddPhoneCtrl.$inject = ['$scope', '$state', 'userSvc', 'authSvc', 'regSvc', 'toastr', 'messagesSvc', 'codes', 'phoneSvc', '$stateParams', '$ionicLoading', 'geoSvc'];

    function AddPhoneCtrl($scope, $state, userSvc, authSvc, regSvc, toastr, messagesSvc, codes, phoneSvc, $stateParams, $ionicLoading, geoSvc) {
        const vm = this;
        if (authSvc.isLogined()) {
            authSvc.processAutoLogin();
        } else if (userSvc.isShowStart()) {
            $state.go('view');
        } else {
            authSvc.clearAuthData();
            userSvc.resetData();
        }
        vm.send = send;
        vm.getSelectCode = getSelectCode;
        vm.selectCode = selectCode;
        vm.checkKey = checkKey;
        vm.select_code = '+1';
        vm.codes = codes;
        vm.phone = $stateParams.phone || '';
        vm.keyShow = false;

        // if (authSvc.isLogined()) {
        //     authSvc.processAutoLogin();
        // }
        init();

        function init() {
            getLoc();
            // getCurrentPosition();
        }

        function getCurrentPosition() {
            geoSvc.initGoogleMaps(function () {
                geoSvc.getPosition().then(function (res) {
                    let currentPos = {
                        lat: res.coords.latitude,
                        lng: res.coords.longitude,
                    };
                    geoSvc.getAddress(currentPos, getCode, function () {
                        console.log('--error');
                        $ionicLoading.hide();
                    })
                }, function (res) {
                    geoSvc.errorInetOrGPS().then(function (res) {
                        if (res) {
                            getCurrentPosition();
                        } else {
                            console.log('--error')
                            $ionicLoading.hide();
                        }
                        getCode();
                    });
                });
            });
        }

        function getLoc() {
            $.getJSON("http://ip-api.com/json/?callback=?", function (data) {
                if (data) {
                    phoneSvc.setDefaultCountry(data.country);
                } else {
                    phoneSvc.setDefaultCountry('Canada');
                }
                vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
                vm.select_code = vm.selected_country.code;
            });
        }

        function getCode(data) {
            if (data) {
                if (data.results && data.results.length) {
                    getCountry(data.results);
                }
            } else {
                phoneSvc.setDefaultCountry('Canada');
            }
            vm.selected_country = vm.codes[phoneSvc.getDefaultIndex()];
            vm.select_code = vm.selected_country.code;
        }

        function getCountry(arr) {
            angular.forEach(arr, function (item) {
                if (item.types[0] == 'country') {
                    phoneSvc.setDefaultCountry(item.long_name);
                }
            })
        }

        function send() {
            authSvc.setCountryId(vm.selected_country.id);
            let phone = phoneSvc.preparePhone(vm.select_code, vm.phone);
            if (!phoneSvc.validatePhone(phone)) {
                toastr.error(messagesSvc.error().invalidPhone);
                return;
            }
            regSvc.sendPhone({
                phone: phone
            }).then(function (res) {
                if (res.success && res.data) {
                    // toastr.success(res.data, null, {
                    //     timeOut: 3000,
                    //     tapToDismiss: true
                    // });
                    authSvc.setPhone(phone);
                    $state.go('add-code', {phone: vm.phone});
                    vm.phone = '';
                } else if (res.message) {
                    toastr.error(res.message);
                }
            });
        }

        window.addEventListener('native.keyboardshow', keyboardShowHandler);

        function keyboardShowHandler(e) {
            setTimeout(function () {
                let addItem = document.querySelector('.add-phone');
                console.log(addItem);
                let itemBlockTop = document.querySelector('.registration-item');
                let img = document.querySelector('.item-block-top .img-wrap .img-outer img');
                let p = document.querySelector('.item-block-top .img-wrap p');
                if (itemBlockTop && itemBlockTop.style) {
                    itemBlockTop.style.paddingTop = '5vh';
                    img.style.height = '7vh';
                    p.style.marginBottom = '2vh';
                }
            }, 0);
        }

        window.addEventListener('native.keyboardhide', keyboardHideHandler);

        function keyboardHideHandler(e) {
            setTimeout(function () {
                let itemBlockTop = document.querySelector('.registration-item');
                let img = document.querySelector('.item-block-top .img-wrap .img-outer img');
                let p = document.querySelector('.item-block-top .img-wrap p');
                if (itemBlockTop && itemBlockTop.style) {
                    itemBlockTop.style.paddingTop = '19vw';
                    img.style.height = 'auto';
                    p.style.marginBottom = '7%';
                }
            }, 0);
        }


        function checkKey(event) {
            if (event.which === 13) {
                send();
            }
        }

        function getSelectCode() {
            vm.codePopup = phoneSvc.showSelect($scope);
        }

        function selectCode(code) {
            vm.select_code = code.code;
            vm.selected_country = code;
            vm.codePopup.close();
        }

    }

})();
