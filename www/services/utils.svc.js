;(function () {
    'use strict';

    angular.module('service.utilsSvc', []).factory('utilsSvc', utilsSvc);

    utilsSvc.$inject = [];

    function utilsSvc() {
        var model = {
            initializePolyfill: initializePolyfill,
            createObjByArrayIds: createObjByArrayIds,
        };
        return model;

        function initializePolyfill(){
            findIndex();
        }

        function findIndex(){
            if (!Array.prototype.findIndex) {
                Array.prototype.findIndex = function(predicate) {
                    if (this == null) {
                        throw new TypeError('Array.prototype.findIndex called on null or undefined');
                    }
                    if (typeof predicate !== 'function') {
                        throw new TypeError('predicate must be a function');
                    }
                    var list = Object(this);
                    var length = list.length >>> 0;
                    var thisArg = arguments[1];
                    var value;
                    for (var i = 0; i < length; i++) {
                        value = list[i];
                        if (predicate.call(thisArg, value, i, list)) {
                            return i;
                        }
                    }
                    return -1;
                };
            }
        }
        function createObjByArrayIds(data_arr) {
            var tempData = {};
            if (Array.isArray(data_arr)) {
                data_arr.forEach(function (item) {
                    if (item.id) {
                        tempData[item.id] = item;
                    }
                });
            }
            return tempData;
        }

    }
})();