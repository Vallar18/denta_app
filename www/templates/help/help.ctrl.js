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



            //-----------------------------------------------------------------
        }
    }
)();