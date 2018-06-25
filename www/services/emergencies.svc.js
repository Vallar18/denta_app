;(function () {
    'use strict';

    angular.module('service.emergenciesSvc', []).factory('emergenciesSvc', emergenciesSvc);

    emergenciesSvc.$inject = ['http', 'url', '$state'];

    function emergenciesSvc( http, url, $state) {
        var model = {
            create: create,
            addPhotos: addPhotos,
            deletePhotos: deletePhotos,
            activate: activate,
            changeToViewed: changeToViewed
        };
        return model;

        function create(data){
            return http.post(url.emergencies.create,data);
        }

        function addPhotos(data){
            return http.post(url.emergencies.addPhotos,data);
        }

        function deletePhotos(data){
            return http.post(url.emergencies.deletePhotos,data);
        }

        function activate(data){
            return http.post(url.emergencies.activate,data);
        }

        function changeToViewed(data){
            return http.post(url.emergencies.changeToViewed,data);
        }

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