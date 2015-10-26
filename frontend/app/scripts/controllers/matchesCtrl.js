'use strict';
/**
 * @ngdoc controller
 * @name nodeAngularOauthApp.MatchesCtrl
 * @description
 * # MatchesCtrl
 */
angular.module('nodeAngularOauthApp')
        .controller('MatchesCtrl', function ($scope, $http, API_URL, alert,matchesService,
                                                authToken, $state, UNAUTHORIZED, tips, resHandler, general) {
            var url = API_URL + 'matches';
            var sessionId = authToken.getSessionId();
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
                return;
            }
            var user = {
                sessionId: sessionId,
            };
            $scope.saveUsersTips = function (match) {
                tips.set(match,sessionId);
            };
            $scope.checkTipChange = function (match) {
                if(general.IsNumeric(Number(match.tip1Goals))){
                  $scope.wrongvalue = true;
                }else{
                  $scope.wrongvalue = false;
                }
            };
            //get the logged in user own matches
            matchesService.getOwnMatches(url, user);

            $scope.$on('ownmatchresultevent', function(event,args) {
                  $scope.matches = args.matches;
                  $scope.winner = args.winner;
            });
            $scope.$on('tipsuccessevent', function(event,args) {
                if(args.success){
                  $scope.tipsuccess = true;
                  $scope.matchid = args.id;
                }else{
                  $scope.tipsuccess = false;
                  $scope.matchid = args.id;
                }
            });

        });

