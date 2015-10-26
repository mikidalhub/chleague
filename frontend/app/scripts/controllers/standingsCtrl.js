'use strict';
/**
 * @ngdoc controller
 * @name nodeAngularOauthApp.StandingsCtrl
 * @description
 * # StandingsCtrl
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
        .controller('StandingsCtrl', function ($http, alert, authToken, $scope,
                                               $state, API_URL, UNAUTHORIZED, resHandler, standingService) {

            var sessionId = authToken.getSessionId();
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
            }
            var user = {
                sessionId: sessionId,
            };            
            $scope.getUserMatches = function(userid, firstname, lastname){
                  $scope.loading = true;
                  $scope.userid = userid;
                  user.userId  = userid;
                  //get the selected user's matches
                  standingService.getUserMatches(userid, firstname, lastname, user);
            };
            //get users initially and appear in a list
            standingService.getUsers(user);

            //waiting for the users list results
            $scope.$on('usersresultevent', function(event,args) {
                  $scope.users = args.users;
            });
            //waiting for the selected users matches
            $scope.$on('usermatchesresultevent', function(event,args) {
                  $scope.matches = args.matches;
                  $scope.winner = args.winner;
                  $scope.loading = args.loading;
            });

        }).directive('users', function(){
              return{
                restrict:'E',
                templateUrl:'views/users.html',
                replace:true,
                transclude: false,
              };
        }).directive('usermatches', function(){
              return{
                restrict:'E', //where E means element, A means attribute C means directive
                templateUrl:'views/usermatches.html',
                replace:true,
                transclude: false,
              };
        });
