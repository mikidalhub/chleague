'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.general
 * @description
 * # general
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('general', function (authToken) {
   var general = {
                jsonParse: function (json) { //return true
                    var obj;
                    try{
                        obj = JSON.parse(json);
                    }catch(err){
                        console.log('error on json parse');
                    }
                    return obj;  
                },
                getCountries: function(){                                    
                   
                },
                isEmpty : function (obj) {
                    var hasOwnProperty = Object.prototype.hasOwnProperty;
                    // null and undefined are "empty"
                    if (obj === null) {return true;}

                    // Assume if it has a length property with a non-zero value
                    // that that property is correct.
                    if (obj.length > 0) {return false;}
                    if (obj.length === 0) {return true;}

                    // Otherwise, does it have any properties of its own?
                    // Note that this doesn't handle
                    // toString and valueOf enumeration bugs in IE < 9
                    for (var key in obj) {
                        if (hasOwnProperty.call(obj, key)) {return false;} 
                    }

                    return true;
                },
                handleCurrentTime: function (currentTime) {
                            var currentTimeObj = this.jsonParse(currentTime);
                            var now = new Date();
                            var offset;
                            if(currentTimeObj.success){
                                offset = now.getTime() - currentTimeObj.time;                        
                                authToken.setDateTimeOffset(offset);
                            }else{
                                //console.log('Unabel to get current time');
                            }    
                },
                getWinnerFromArray: function (countriesObj, user) {
                            var winner, assocCountries ={};
                            angular.forEach(countriesObj, function (value, key) {                                                                            
                                assocCountries[value.cod] = value.name;
                                if(user){
                                    if(value.id === user.winnerId){
                                        winner = value.name;
                                        return winner;
                                    }
                                }
                            });   
                },
                handleCountries: function (countriesObj, user) {
                            var assocCountries = {}, winner;                                                                                
                            angular.forEach(countriesObj.countries, function (value, key) {                                                                            
                                assocCountries[value.cod] = value.name;
                                if(user){
                                    if(value.id === Number(user.winnerId)){
                                        winner = value.name;
                                        authToken.setWinner(value.name);//save selected winner into local storage
                                    }
                                }
                            });                            
                            authToken.setCountries(assocCountries);
                            return {
                                'countries':assocCountries,
                                'winner':winner
                            };
                }, 
            };
            return general;
  });
