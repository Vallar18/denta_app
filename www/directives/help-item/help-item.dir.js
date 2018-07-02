;(function () {
    angular.module('directives.helpItem', [])
        .directive('helpItem', helpItem);

    helpItem.$inject = [];

    function helpItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/help-item/help-item.html',
            scope: {
                hiItem: '=',
                hiDistance: '=',
                hiDoctor: '=',
                hiPrice: '=',
                hiCurrency: '=',
                hiRating: '=',
                hiType: '=',
                hiTime: '=',
                hiAddress: '='
            },
            controller: 'HelpItemCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
