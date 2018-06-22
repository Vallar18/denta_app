;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DentistProfileCtrl', DentistProfileCtrl);

    DentistProfileCtrl.$inject = ['userSvc', '$state'];

    function DentistProfileCtrl(userSvc, $state) {
        var vm = this;
        vm.country = 'Israel';
        vm.profile = userSvc.getUser();
        vm.test = [ {name: 'tdddd est'}, {name: 'tefg dfg st'},{name: 'tdf vfdv est'}, {name: 'gdfgdfgdfgdfg '},{name: 'test'}, {name: 'test'},{name: 'test'}, {name: 'test'}];
        vm.editDentist = editDentist;

        function editDentist() {
            $state.go('registration-dentist', {edit: true})
        }

        vm.reviewArr = [
            {
                id:1,
                date: '12 03 1093',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
            {
                id:2,
                date: '12 03 1093',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
            {
                id:3,
                date: '12 03 1093',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
        ];
    }
})();