'use strict';

angular.module('nodeAngularOauthApp')
        .controller('ChangepasswordCtrl', function ($http, alert, authToken, changePasswordService,
                                                            $scope, $state, API_URL, UNAUTHORIZED) {
            var sessionId = authToken.getSessionId();
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
            }
            $scope.submit = function () {
                var url = API_URL + 'changepassword';
                var user = {
                    oldpassword: $scope.oldpassword,
                    newpassword: $scope.password,
                    sessionId: sessionId,
                };
                changePasswordService.setNewPassword(url, user);
            };
        });
