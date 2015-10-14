'use strict';

angular.module('nodeAngularOauthApp')
        .controller('MatchesCtrl', function ($scope, $http, API_URL, alert,
                                                authToken, $state, UNAUTHORIZED, tips, resHandler, general) {
            var url = API_URL + 'matches';
            var promise;
            var sessionId = authToken.getSessionId();
            if (!sessionId) {
                alert('warning', UNAUTHORIZED);
                $state.go('login');
                return;
            }
            var user = {
                sessionId: sessionId,
            };
            $scope.saveUsersTips = function (match, index) {
                var tipObj =  tips.set(match,sessionId,index);
                if(tipObj.success){
                  $scope.tipsuccess = true;
                  $scope.matchid = tipObj.id;
                }else{
                  $scope.tipsuccess = false;
                  $scope.matchid = tipObj.id;
                }
            };
            $scope.checkTipChange = function (match) {
                if(IsNumeric(Number(match.tip1Goals))){
                    $scope.wrongvalue = true;
                }else{$scope.wrongvalue = false;}
            };
            promise = $http.post(url,user);
            promise.then(function(result) {
              //var resobj = resHandler.handleMatches(result.data, user);
                var matchesResultObject = general.jsonParse(result.data);
                if (matchesResultObject.success) {
                    var countries = [], matchesArr = {},  resObj;
                    countries = authToken.getCountries();
                    user.winnerId = authToken.getWinner();
                    if(general.isEmpty(countries)){
                        $http.post(API_URL + 'countries', user).success(function (result) {
                             var countriesRespObject = general.jsonParse(result);
                             var obj = general.handleCountries(countriesRespObject ,user);
                             resObj = resHandler.setAndOrderCountries(obj.countries,matchesResultObject);
                             $scope.matches = resObj.matches;
                             $scope.winner = resObj.winner;
                        }).error(function (err) {
                        });
                    } else {
                            resObj = resHandler.setAndOrderCountries(countries, matchesResultObject);
                            $scope.matches = resObj.matches;
                            if(resObj.winner.length > 1){
                                $scope.winner = resObj.winner;
                            } else {
                                $scope.winner = general.getWinnerFromArray(countries);
                            }
                    }
                } else {
                    alert('warning', UNAUTHORIZED);
                    $state.go('login');
                }

            }),function(err){
                alert('warning', 'Unable to get matches!' + err.message);
            };
           function IsNumeric(input){
                return isNaN(input);
           }
        });

