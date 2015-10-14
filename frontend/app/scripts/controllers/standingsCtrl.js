'use strict';

angular.module('nodeAngularOauthApp')
        .controller('StandingsCtrl', function ($http, alert, authToken, $scope, $state, API_URL, UNAUTHORIZED, resHandler) {
            var url = API_URL + 'users';
            var userMatchesUrl = API_URL + 'usermatches';
            var sessionId = authToken.getSessionId();
            var promise, promiseUsers;
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
            }
            var user = {
                sessionId: sessionId,
            };

            $scope.getUserMatches = function(userid,firstname, lastname){
                user.userId = userid;
                promise = $http.post(userMatchesUrl,user);
                $scope.loading = true;
                $scope.userid = userid;
                promise.then(function(result) {
                  var resobj = resHandler.getUserMatches(result.data,firstname, lastname);
                  $scope.matches = resobj.matches;
                  $scope.winner = resobj.winner;
                  $scope.loading = false;
                }),function(err){
                    alert('warning', 'Unable to get matches! ' + err.message);
                };
            };
            promiseUsers = $http.post(url,user);
            promiseUsers.then(function(result) {
              var resobj = resHandler.getUsers(result.data);
              $scope.users = resobj.users;
            }),function(err){
                alert('warning', 'Unable to get matches! ' + err.message);
            };
        }).directive('users', function(){
              return{
                restrict:'E',
                templateUrl:'views/users.html',
                contorller:'standingsCtrl',
                replace:true,
              }
        }).directive('usermatches', function(){
            return{
              restrict:'E', //where E means element, A means attribute C means directive
              templateUrl:'views/usermatches.html',
              contorller:'matchesCtrl',
              replace:true,
              transclude: false,
            }
          });
