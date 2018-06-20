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
                    address: 'Rishon LeTsiyon, Levi Eshkol St. 16',
                    time: '10min'
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
                    address: ' kmfvfdvkjfdnkj vdfnv kjdfn vkjdfdfkjnv kjdfnv kdfkvjndfkjvnn kjdfnv df v',
                    time: '10min'
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
                    address: ' kmfvfdvkjfdnkj vdfnv kjdfn vkjdfn vkdfnvkjndfkjv  kdfkvjndfkjvnn kjdfnv df v',
                    time: '10min'
                },
            ];

            vm.reviewArr = [
                {
                   id:1,
                    date: '14.05.1948',
                    rating: 5,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvl fvnskdfjvn ksdjnvdfvkj nkjdfvn sd'
                },
                {
                    id:2,
                    date: '12 03 1093',
                    rating: 4,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjv ndk nsdfkj vndkl fvnskdfj    vnksdj nvdfv kjnkj dfvn sd'
                },
                {
                    id:3,
                    date: '12 03 1093',
                    rating: 4,
                    name: 'Vasylyi',
                    text: 'Test test tskjnfkvn dsvkn lkdfjvn sdkn vdslfk vndkf jvndknsd fkjvnd    klfv nskdfjvnksd jnvdf vkjn kjdfvn sd'
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



            //-----------------------------------------------------------------
        }
    }
)();