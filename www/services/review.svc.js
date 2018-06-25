;(function () {
    'use strict';

    angular.module('service.reviewSvc', []).factory('reviewSvc', reviewSvc);

    reviewSvc.$inject = ['http', 'url'];

    function reviewSvc(http, url) {
        let model = {
            create: create,
            getItems: getItems
        };
        return model;

        function create(data) {
            return http.post(url.review.create, data);
        }

        function getItems(data) {
            return http.post(url.review.getAll, data);
        }
    }
})();