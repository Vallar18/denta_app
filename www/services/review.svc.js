;(function () {
    'use strict';

    angular.module('service.reviewSvc', []).factory('reviewSvc', reviewSvc);

    reviewSvc.$inject = [];

    function reviewSvc() {
        let cache = {};
        let model = {
            addPhoto: addPhoto,
            removePhoto: removePhoto
        };
        return model;

        /**
         * @description add photo for review by id
         * @param reviewId
         * @param file
         * @param file.name - name of file example.jpg
         * @param file.data - dataUrl in base64 format
         */
        function addPhoto(reviewId,file){
            if(!angular.isArray(cache[reviewId])){
                cache[reviewId] = [];
            }
            cache[reviewId].push({
                name:file.name,
                data: file.data
            })
        }

        /**
         * @description remove photo by review id, if only id - remove all array of photo,
         * @description if id and name, remove only by name
         * @param reviewId
         * @param name
         */
        function removePhoto(reviewId,name) {
            if(!name){
                delete cache[reviewId];
            } else if(reviewId && name && angular.isArray(cache[reviewId])){
                cache[reviewId] = cache[reviewId].filter(function(val){
                    return val.name !== name;
                })
            }
        }
    }
})();