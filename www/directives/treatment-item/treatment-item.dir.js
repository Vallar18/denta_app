;(function () {
    angular.module('directives.treatmentItem', [])
        .directive('treatmentItem', treatmentItem);

    treatmentItem.$inject = [];

    function treatmentItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/treatment-item/treatment-item.html',
            scope: {
                tiDentist: '<',
                tiDate: '<',
                tiCountry: '<',
                tiFiles: '=',
                tiPrice: '<',
                tiReview: '&',
                tiNeedReview: '<',
                tiNotify: '&',
                tiIsNotified: '<',
                tiIsFiles: '<',
                tiCanNotify: '<'
            },
            controller: 'TreatmentItemCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
