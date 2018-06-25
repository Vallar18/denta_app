;(function () {
    angular.module('directives.treatmentItem', [])
        .directive('treatmentItem', treatmentItem);

    treatmentItem.$inject = [];

    function treatmentItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/treatment-item/treatment-item.html',
            scope: {
                tiItem: '=',
                tiDentist: '@',
                tiDate: '=',
                tiCountry: '=',
                tiFiles: '=',
                tiPrice: '=',
                tiReview: '&',
                tiNeedReview: '=',
                tiNotify: '&',
                tiIsNotified: '=',
                tiIsFiles: '=',
                tiCanNotify: '=',
                tiHaveHomeDoctor: '='
            },
            controller: 'TreatmentItemCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
