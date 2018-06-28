;(function () {
    'use strict';

    angular
        .module('app')
        .controller('DentistProfileCtrl', DentistProfileCtrl);

    DentistProfileCtrl.$inject = ['userSvc', '$state', 'authSvc', '$ionicHistory', 'dentistProfile', '$stateParams', 'reviewItems'];
    function DentistProfileCtrl(userSvc, $state, authSvc, $ionicHistory, dentistProfile, $stateParams, reviewItems) {
        let vm = this;
        vm.editDentist = editDentist;
        vm.addDentist = addDentist;
        vm.editDentistPhone = editDentistPhone;
        vm.isExpandDescr = false;
        vm.profile = $stateParams.id? dentistProfile: userSvc.getUser();
        vm.have_den = userSvc.isHaveDentist();
        vm.reviewArr = reviewItems;
        vm.isViewMode = $stateParams.id ? true : false;
        vm.back = function () {
            $ionicHistory.goBack();
        };
        init();
        function init() {
            authSvc.addBackBehave(false);
            if (vm.profile) {
                if (!vm.profile.rating) {
                    vm.profile.rating = 0;
                }
            }
            if (userSvc.getPatientDentist() && userSvc.getPatientDentist()[0]) {
                vm.home_dentist = userSvc.getPatientDentist()[0];
                if (vm.home_dentist.clinic) {
                    vm.home_dentist_clinic = vm.home_dentist.clinic;
                }
            }
            vm.show_navigate = userSvc.isDoc();
        }

        function editDentist() {
            $state.go('registration-dentist', {edit: true});
            authSvc.addBackBehave(true);
        }

        function editDentistPhone() {
            $state.go('add-dentist-phone', {invite_for_den: true});
            authSvc.addBackBehave(true);
        }

        function addDentist() {
            $state.go('add-dentist-phone', {invite_for_den: true});
        }

        $(document).ready(function () {
            function changeHeight() {
                setTimeout(function () {
                    var body_height = $('.dentist-profile').height(),
                        footer_height = $('.tab-nav').height(),
                        header_height = $('.dentist-profile-header-wrap').height(),
                        height_calc = body_height - footer_height - header_height;
                    $('.dentist-profile__main').height(height_calc);
                }, 500);
            }
            changeHeight();
        });

    }
})();