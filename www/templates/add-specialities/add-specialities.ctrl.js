;(function () {
    'use string'

    angular
        .module('app')
        .controller('AddSpecialitiesCtrl', AddSpecialitiesCtrl);

    AddSpecialitiesCtrl.$inject = ['$state', 'regSvc', 'toastr', '$localStorage'];

    function AddSpecialitiesCtrl($state, regSvc, toastr, $localStorage) {
        const vm = this;
        vm.send = send;
        vm.user = $localStorage.user;
        vm.role = $localStorage.role;

        function send() {
            $state.go('share');
            // if(validPhoneDentist()){
            //     if (vm.user){
            //         vm.data = {
            //             user_id: vm.user.id,
            //             role: vm.role,
            //
            //         };
            //     }
            //     regSvc.addRolePatient(vm.send).then(function (data) {
            //         if(data.success) {
            //             toastr.success(data.message, '', {
            //                 onHidden: function () {
            //                     $state.go('share')
            //                 }
            //             });
            //         } else {
            //             if(data.message) {
            //                 toastr.error(data.message);
            //             }
            //         }
            //     }, function (err) {
            //         var err_text = '';
            //         angular.forEach(err, function (val, key) {
            //             if (angular.isArray(val)){
            //                 err_text += val.reduce(function (acc, current) {
            //                     return acc + '\n' + current;
            //                 }, '');
            //             }
            //         });
            //         if(err_text.length){
            //             toastr.error(err_text);
            //         }
            //     });
            // }
        }
    }

})();