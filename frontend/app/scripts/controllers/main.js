'use strict';

angular.module('nodeAngularOauthApp')
        .controller('MainCtrl', function ($scope, $http, $state, authToken, API_URL, general) {
            var sessionId = authToken.getSessionId();
            if (!sessionId) {
                $state.go('login');
            }
            var url = API_URL + 'validate';
            var validateSessionRespObject;
            var user = {
                sessionId: sessionId,
            };
            $http.post(url, user)
                .success(function (res) {
                    validateSessionRespObject = general.jsonParse(res);
                    if (!validateSessionRespObject.success) {
                        $state.go('logout');
                    } else {
                        $state.go('matches');
                    }
                })
                .error(function (err) {
                    console.log('error on validation' + err);
                    $state.go('login');
                });
        });
