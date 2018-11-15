;(function () {
    'use strict';

    angular.module('service.questionSvc', []).factory('questionSvc', questionSvc);

    questionSvc.$inject = ['url', 'http'];

    function questionSvc(url, http) {
        var model = {
            getAll: getAll,
            create: create,
        };
        return model;

        function getAll(){
            return http.get(url.question.all);
        }

        function create(data){
            return http.post(url.support.create, data);
        }

    }
})();