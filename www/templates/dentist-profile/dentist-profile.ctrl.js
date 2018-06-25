;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DentistProfileCtrl', DentistProfileCtrl);

    DentistProfileCtrl.$inject = ['userSvc', '$state'];

    function DentistProfileCtrl(userSvc, $state) {
        var vm = this;
        vm.isExpandDescr = false;
        vm.country = 'Israel';
        vm.profile = userSvc.getUser();
        vm.test = [{name: 'tdddd est'}, {name: 'tefg dfg st'}, {name: 'tdf vfdv est'}, {name: 'gdfgdfgdfgdfg '}, {name: 'test'}, {name: 'test'}, {name: 'test'}, {name: 'test'}];
        vm.editDentist = editDentist;

        function editDentist() {
            $state.go('registration-dentist', {edit: true})
        }

        if(userSvc.isDoc()){
            vm.show_navigate = false;
        } else{
            vm.show_navigate = true
        }

        vm.reviewArr = [
            {
                id: 1,
                date: '12.03.1993',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
            {
                id: 2,
                date: '12 03 1093',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
            {
                id: 3,
                date: '12 03 1093',
                rating: 4,
                name: 'Vasylyi',
                text: 'Test test tskjnfkvn dsvknlkdfjvn sdkn vdslfk vndkfjvndknsdfkjvndklfvnskdfjvnksdjnvdfvkjnkjdfvn sd'
            },
        ];

        $(document).ready(function () {
            function changeHeight() {

                setTimeout(function () {
                        var body_height = $('.dentist-profile').height(),
                            footer_height = $('.tab-nav').height(),
                            header_height = $('.dentist-profile-header-wrap').height(),
                            height_calc = body_height - footer_height - header_height;
                        $('.dentist-profile__main').height(height_calc);
                    }
                    , 500);
            }

            changeHeight();

        });

    }
})();