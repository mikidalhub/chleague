    'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.tips
 * @description
 * # handle the tip progress itself, send the appropriate GET params to the server
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('tips', function ($http, API_URL, alert, authToken, general, observerService) {

       var urlSetUsersTipUrl = API_URL + 'setusertips';
       var tips = {
                set: function (match,sessionId) {
                        var user = {
                           'sessionId' : sessionId,
                           'matchid' : match.id,
                           'tip1' : match.tip1Goals,
                           'tip2' : match.tip2Goals,
                        };
                        var matchDate,  matchDateTime, dateOffset,nowWithOffset, now, promise;
                        try{
                             now = new Date();
                             matchDate = new Date(match.date);
                             matchDateTime = matchDate.getTime();
                             dateOffset = Number(authToken.getDateTimeOffset());
                             nowWithOffset = now.getTime() + dateOffset;
                        } catch(err) {}
                        //check if the tip is allowable or not
                        if(nowWithOffset && matchDateTime && nowWithOffset < matchDateTime){ //if now < start date of the match
                            var obj = {}, args = {};
                            promise = $http.post(urlSetUsersTipUrl, user);
                            promise.then(function(result) {
                                obj = general.jsonParse(result.data);
                                if(obj.success){
                                    args = {'id' : match.id, 'success' : true };
                                    observerService.triggerTipObserverEvents(args);
                                }
                            }),function(err){
                                args = {'id' : match.id, 'success' : false};
                                observerService.triggerTipObserverEvents(args);
                                alert('warning', 'Unable to set tips! Error occured!' + err.message);
                            };
                        }else{
                            alert('warning', 'The match has already been started! You must NOT tip during the match!');
                        }
                    }
            };
            return tips;
  });
