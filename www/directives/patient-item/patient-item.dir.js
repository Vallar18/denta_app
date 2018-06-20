;(function () {
    angular.module('directives.patientItem', [])
        .directive('patientItem', patientItem);

    patientItem.$inject = [];

    function patientItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/patient-item/patient-item.html',
            scope: {
                piDoctor: '<',
                piPatient: '<',
                piDate: '<',
                piCountry: '<',
                piAlarm: '<'
            },
            controller: 'PatientItemCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }
})();