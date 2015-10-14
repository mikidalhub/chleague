'use strict';

angular.module('nodeAngularOauthApp')
        .controller('ChangepasswordCtrl', function ($http, alert, authToken, 
                                                            $scope, $state, API_URL, UNAUTHORIZED, general) {
            var sessionId = authToken.getSessionId();            
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
            }
            $scope.submit = function () {
                var promise;
                var url = API_URL + 'changepassword';
                var user = {
                    oldpassword: $scope.oldpassword,
                    newpassword: $scope.password,
                    sessionId: sessionId,
                };
                promise = $http.post(url, user);//get countries
                promise.then(function(result) {
                    var obj = general.jsonParse(result.data);
                    if(obj.success){
                        alert('success', 'The new password was set successfully!');
                        setTimeout(function () {
                            $state.go('logout');
                        }, 1000);
                    }                                             
                }),function(err){
                    console.log('error on change password' + err);
                    alert('warning', 'Unable to set new pasword!' + err.message);
                };                
            };
        });
