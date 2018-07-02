;(function () {
    'use strict';

    angular
        .module('app')
        .controller('AboutCtrl', AboutCtrl);

    AboutCtrl.$inject = ['$ionicPopup', '$scope','$ionicHistory', 'textSvc'];

    function AboutCtrl($ionicPopup, $scope, $ionicHistory, textSvc) {
        const vm = this;
        init();

        function init() {
            textSvc.getAbout().then(function (res) {
                if(res){
                    vm.text_about = res.description;
                }
            });
        }

        vm.back = function () {
            $ionicHistory.goBack();
        };
    }
})();