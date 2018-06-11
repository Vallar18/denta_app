;(function () {
        'use strict';

        angular
            .module('app')
            .controller('HelpCtrl', HelpCtrl);

        HelpCtrl.$inject = ['$scope', '$ionicModal', '$cordovaContacts', '$ionicPlatform'];

        function HelpCtrl($scope, $ionicModal, $cordovaContacts, $ionicPlatform) {
            var vm = this;

            vm.pickContactUsingNativeUI = function () {
                $ionicPlatform.ready(function () {
                    $cordovaContacts.pickContact().then(function (contactPicked) {
                        vm.phoneNumbers = contactPicked.phoneNumbers;
                    }, function(error){

                    })
                });
            };

            vm.getCameraPic  = function(){
                $ionicPlatform.ready(function () {

                });
            }
        }
    }
)();