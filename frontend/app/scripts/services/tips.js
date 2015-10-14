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
                set: function (match,sessionId, index) {
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
                        } catch(err) {
                            //console.log('date error' + err.message);
                            return;
                        }
                        if(nowWithOffset < matchDateTime){ //if now < start date of the match
                            promise = $http.post(urlSetUsersTipUrl, user);
                            promise.then(function(result) {
                                var obj = general.jsonParse(result.data);
                                if(obj.success){
                                    var args = {'id' : match.id, 'success' : true}
                                    //observerService.triggerTipObserverEvents(args);
                                }
                            }),function(err){
                                var args = {'id' : match.id, 'success' : false}
                                observerService.triggerTipObserverEvents(args);
                                alert('warning', 'Unable to set tips! Error occured!' + err.message);
                            };
                        }else{
                            //console.log('not allowed!');
                            alert('warning', 'The match has already been started! You must NOT tip during the match!');
                        }
                        return {
                          'id' : match.id,
                          'success' : true
                        }
                    }
            };
            return tips;
  });
