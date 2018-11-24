;(function () {
    'use strict';

    angular.module('service.helpSvc', []).factory('helpSvc', helpSvc);

    helpSvc.$inject = ['url', 'http'];

    function helpSvc(url, http) {
        var model = {
            getByPos: getByPos,
            prepareDrFromClinic: prepareDrFromClinic
        };
        return model;

        function getByPos(data) {
            return http.post(url.help.getItems, data);
        }

        /**
         * @description Create array of doctors by array of clinics
         * @param clinicArr
         * @returns {Array}
         */
        function prepareDrFromClinic(clinicArr) {
            let docArr = [];
            if (angular.isArray(clinicArr)) {
                clinicArr.forEach(function (val) {
                    if (angular.isArray(val.users)) {
                        val.users.forEach(function (user) {
                                if (user.dentist) {
                                    if (user.rating === null) {
                                        user.rating = 4;
                                    }
                                    user.latitude = +val.latitude;
                                    user.longitude = +val.longitude;
                                    try {
                                        user.price = user.dentist.price;
                                    } catch (err) {
                                        user.price = 0;
                                    }
                                    docArr.push(user);
                                }
                            }
                        );
                    }
                });
            }
            return docArr;
        }
    }
})();