;(function () {
    'use strict';
    angular
        .module('factory.request', ['ngStorage'])
        .factory('http', http);

    http.$inject = ['$rootScope', '$http', '$q', '$sessionStorage', '$localStorage', 'toastr', '$state','$ionicLoading'];

    function http($rootScope, $http, $q, $sessionStorage, $localStorage, toastr, $state,$ionicLoading) {
        let request = function (method, url, data) {
            $rootScope.loading = true;
            let config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };
            if (method === 'POST' && data.responseType) {
                config.responseType = data.responseType;
            }
            if (method === 'GET') {
                config.params = data;
                // if ($sessionStorage.locale) {
                //     console.log(config.params)
                //     // config.params.locale = $sessionStorage.locale;
                // }
                if (data && data.responseType) {
                    config.responseType = data.responseType;
                }
            } else {
                config.data = data;
                // if ($sessionStorage.locale) {
                //     config.data.locale = $sessionStorage.locale;
                // }
            }
            if ($sessionStorage.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.auth_key;
                if ($localStorage.locale) {
                    url = url + '&locale=' + $localStorage.locale;
                    // if ($sessionStorage.id){
                    //     url = url + '&id=' + $sessionStorage.id;
                    // }
                }
            }
            if ($sessionStorage.token) {
                config.url = url;
                // config.headers.Authorization = `Token ${$sessionStorage.token}`;
                config.headers.Authorization = 'Token ' + $sessionStorage.token;
            } else {
                config.url = url;
            }
            $ionicLoading.show({
                template: 'Loading...',
            });
            return $http(config).then( requestSuccess, requestError);
        };

        function requestSuccess(response) {
            $rootScope.loading = false;
            let defer = $q.defer();
            // console.clear();
            console.info('response', url, response);
            $ionicLoading.hide();
            if (response.data.error) {
                toastr.error(response.data.error);
                defer.reject(response.data.error);
            }
            else {
                defer.resolve(response.data);
            }
            return defer.promise;
        }
        function requestError(response) {
            console.info('error', url, response);
            let defer = $q.defer();
            if (response.status === 200) {
                toastr.error('Server Error: ' + response.data);
            }
            else if (response.status === -1) {
                toastr.error('Server unavailable');
            }
            else if (response.status === 500) {
                toastr.error(response.data.message);
                // toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
            }
            else if (response.status === 403) {
                toastr.error('Access denied.');
            }
            else {
                if (response.status === 401) {
                    $state.go('app.pages_auth_login');
                }
                // toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
                toastr.error(response.data.message);
            }
            $ionicLoading.hide();
            defer.reject(response.data);
            return defer.promise;
        }

        let requestFile = function (url, data) {
            $rootScope.loading = true;
            console.log(data);
            let config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };

            if ($sessionStorage.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.auth_key;
                if ($localStorage.locale) {
                    url = url + '&locale=' + $localStorage.locale;
                    // if ($sessionStorage.id){
                    //     url = url + '&id=' + $sessionStorage.id;
                    // }
                }
            }

            return $http.post(url, data, config).then(
                function (response) {
                    $rootScope.loading = false;
                    let defer = $q.defer();

                    console.info('response', url, response);
                    if (response.data.error) {
                        toastr.error(response.data.error);
                        defer.reject(response.data.error);
                    }
                    defer.resolve(response.data);
                    return defer.promise;
                },
                function (response) {
                    let defer = $q.defer();
                    console.info('error', url, response);

                    if (response.status === 200) {
                        toastr.error('Server Error: ' + response.data);
                        defer.reject(response.data);
                    }
                    else if (response.status === -1) {
                        toastr.error('Server unavailable');
                        defer.reject(response.data);
                    }
                    else if (response.status === 500) {
                        toastr.error(response.data.message);
                        // toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
                        defer.reject(response.data);
                    }
                    else if (response.status === 403) {
                        toastr.error('Access denied.');
                        defer.reject(response.data);
                    }
                    else {
                        toastr.error('Server Error: ' + response.status + ' ' + response.data.message);
                        defer.reject(response.data);
                    }
                    defer.reject(response.data);
                    return defer.promise;
                }
            );
        };

        return {
            get: function (url, data) {
                return request('GET', url, data);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            delete: function (url, data) {
                return request('DELETE', url, data);
            },
            put: function (url, data) {
                return request('PUT', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            }
        };
    }

})();
