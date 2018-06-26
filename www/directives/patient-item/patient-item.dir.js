;(function () {
    angular.module('directives.patientItem', [])
        .directive('patientItem', patientItem);

    patientItem.$inject = [];

    function patientItem() {
        return {
            restrict: 'E',
            templateUrl: 'directives/patient-item/patient-item.html',
            scope: {
                piItem: '=',
                piDoctor: '=',
                piPhotos: '=',
                piPatient: '=',
                piDate: '=',
                piCountry: '=',
                piAlarm: '='
            },
            controller: 'PatientItemCtrl',
            controllerAs: 'vm',
            link: function (scope, element, attrs) {
            }
        };
    }
})();
