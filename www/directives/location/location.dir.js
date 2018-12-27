;(function () {
    angular.module('directives.location', [])
        .directive('location', location);

    location.$inject = ['$document', '$timeout'];

    function location($document, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'directives/location/location.html',
            scope: {
                locGetLocation: '=',
                locModel: '='
            },
            controller: 'LocationCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {

            }
        };
    }
})();
