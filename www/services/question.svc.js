;(function () {
    'use strict';

    angular.module('service.questionSvc', []).factory('questionSvc', questionSvc);

    questionSvc.$inject = ['url', 'http'];

    function questionSvc(url, http) {
        var model = {
            getAll: getAll
        };
        return model;

        function getAll(){
            return http.get(url.question.getAll);
        }


    }
})();