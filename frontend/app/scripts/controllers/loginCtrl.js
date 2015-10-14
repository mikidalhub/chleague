'use strict';
/**
 * Login -> if login was success then we get a sessionId and after that we call asynchronously the others
 * After we get all the countries than we save to local storage and save the logged in user selected winner
 * @param {type} param1
 * @param {type} param2
 */
angular.module('nodeAngularOauthApp')
        .controller('LoginCtrl', function ($scope, $state, $http, alert,loginHandler,general,$timeout,
                                                    authToken, API_URL,UNAUTHORIZED, observerService ) {
            $scope.submit = function () {
                var url = API_URL + 'login';
                var urlCountries = API_URL + 'countries';
                var urlCurrentTime = API_URL + 'currenttime';
                var promise, promise2;
                var user = {
                    username: $scope.username,
                    password: $scope.password
                };
                //inside the first ajax call -> urlCountries and urlCurrentTime can be asynchron  based on sessionId
                $http.post(url, user)
                        .success(function (result) {
                    var loginObj = loginHandler.getSession(result);
                    user.sessionId = loginObj.sessionId;
                    user.winnerId = loginObj.winnerId;
                    //register an observer to handle login logout events
                    registerObservers();
                    //using the sessionId we look forward the countries
                    promise = $http.post(urlCountries, user);//get countries
                    promise.then(function(result) {
                        var countriesRespObject = general.jsonParse(result.data);
                        if (countriesRespObject.success) {
                            general.handleCountries(countriesRespObject.countries, user);
                            $timeout(function () {
                                $state.go('matches');
                            }, 100);
                        }
                    }),function(err){
                        //console.log('error at get countries!' + err.message);
                        alert('warning', 'Unable to get countries!' + err.message);
                    };
                    //based on sessionId we get current time
                    promise2 = $http.post(urlCurrentTime, user);//get countries
                    promise2.then(function(result) {
                        general.handleCurrentTime(result.data);
                    }),function(err){
                        //console.log('error at handling current time!' + err.message);
                        alert('warning', 'Unable to handle current time!' + err.message);
                    };

                }).error(function (err) {
                    alert('warning', 'Login failed!');
                 });
            };
            //register observers
            function registerObservers(){
                observerService.registerObserverCallback(observerService.authEventTrigger);
                observerService.registerTipsObserverCallback(observerService.tipSuccessTrigger);
                observerService.triggerLoggingObserverEvents();
            }
        });
