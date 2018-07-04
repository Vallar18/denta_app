;(function () {
    'use strict';

    angular
        .module('app')
        .controller('PrivacyCtrl', PrivacyCtrl);

    PrivacyCtrl.$inject = ['$ionicHistory', 'textSvc'];

    function PrivacyCtrl($ionicHistory, textSvc) {
        var vm = this;
        init();

        function init() {
            textSvc.getPrivacy().then(function (res) {
                if(res){
                    vm.text_privacy = res.description;
                }
            });
        }

        vm.back = function () {
            $ionicHistory.goBack();
        };
    }

})();