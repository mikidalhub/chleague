'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.tips
 * @description
 * # handle login related jobs like getting sessionId and give to the other methods /
 * # handling current time of the server
 * # handle and save the countries getting from the server
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('loginHandler', function ($rootScope, $http, API_URL, alert, authToken, $state, general) {
      
       var loginHandler = {
                getSession: function (user) {
                            var loginRespObject = general.jsonParse(user);
                            if (!loginRespObject.success) {
                                alert('warning', 'Opps! ', 'Login failed!');
                                setTimeout(function () {
                                    $state.go('login');
                                }, 200);
                            }                            
                            authToken.setSessionId(loginRespObject.sessionId); //sessionId store in local storage 
                            authToken.setWinner(loginRespObject.winner);                            
                            return {
                                'sessionId':loginRespObject.sessionId,
                                'winnerId':loginRespObject.winner,
                            }
                },
             
            };
            return loginHandler;
  });
