;(function () {
    angular.module('directives.helpItem', [])
        .directive('helpItem', helpItem);

    helpItem.$inject = [];

    function helpItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/help-item/help-item.html',
            scope: {
                hiDistance: '<',
                hiDoctor: '<',
                hiPrice: '<',
                hiCurrency: '<',
                hiRating: '<',
                hiClickInfo: '&',
                hiType: '<',
                hiTime: '<',
                hiAddress: '<'
            },
            controller: 'HelpItemCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
