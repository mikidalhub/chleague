'use strict';

angular.module('nodeAngularOauthApp')
        .factory('authInterceptor', function (authToken) {
            return {
                request: function (config) {
                    var token = authToken.getToken();
                    if (token) {
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                    //console.log('auth intercept, token = ' + token);
                    return config;
                },
                response: function (response) {
                    //response.data.server = "asdfasdf";
                    return response;
                },
            };
        });
