;(function () {
    'use strict';

    angular.module('service.fileSvc', []).factory('fileSvc', fileSvc);

    fileSvc.$inject = [];

    function fileSvc() {
        var model = {};
        // model.search = search;
        return model;

        // function search(arr, searchString) {
        //     if(!searchString){
        //         return arr;
        //     }
        //     searchString = searchString.toLowerCase();
        //
        //     let result = [];
        //
        //     angular.forEach(arr, function(el){
        //         if(el.name.toLowerCase().indexOf(searchString) != -1) {
        //             result.push(el);
        //         }
        //     });
        //     return result;
        // }
    }
})();