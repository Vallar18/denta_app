;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', '$ionicModal', '$cordovaContacts', '$ionicPlatform', '$cordovaCamera', '$ionicPopup','currencySvc','$filter'];

        function HelpCtrl($scope, $ionicModal, $cordovaContacts, $ionicPlatform, $cordovaCamera, $ionicPopup,currencySvc,$filter) {
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
                    price: 95.3,
                    rating: 1.8,
                    distance: 2.6,
                },
                {
                    id: 2,
                    doctor: {
                        id: 6,
                        name: 'Dr House2'
                    },
                    price: 25.6,
                    rating: 3.8,
                    distance: 1.0,
                },
                {
                    id: 3,
                    doctor: {
                        id: 4,
                        name: 'Dr House3'
                    },
                    price: 8.0,
                    rating: 1.8,
                    distance: 1.8,
                },
                {
                    id: 4,
                    doctor: {
                        id: 4,
                        name: 'Dr House3'
                    },
                    price: 100.5,
                    rating: 4.8,
                    distance: 9.8,
                }
            ];

            $scope.$watch(function(){
                return vm.sort;
            },function(newV,oldV){
                if(newV !== oldV){
                    sortItem();
                }
            });

            function sortItem(){
                var isReverse = false;
                switch (vm.sort) {
                    case 'rating':isReverse = true;break;
                    case 'price':isReverse = false;break;
                    case 'distance':isReverse = true;break;
                }
                vm.helpArr =  $filter('orderBy')(vm.helpArr,vm.sort,isReverse);
            }

            init();
            function init(){
                vm.sort = 'rating';
                sortItem();
            }



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