'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.tips
 * @description
 * #
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('resHandler', function ($state, $http, API_URL, alert, authToken, UNAUTHORIZED, general) {

        var resHandler = {
                handleMatches: function (matches, user) {
                    var matchesResultObject = {};
                    matchesResultObject = general.jsonParse(matches);
                    if (matchesResultObject.success) {
                        var countries = [], matchesArr = {},  resObj;
                        countries = authToken.getCountries();
                        if(general.isEmpty(countries)){
                            $http.post(API_URL + 'countries', user).success(function (result) {
                                 general.handleCountries(result);
                                 countries = authToken.getCountries();
                                 resObj = setAndOrderCountries(countries,matchesResultObject);
                                 return {
                                    'winner':resObj.winner,
                                    'matches':resObj.matches,
                                 };
                            }).error(function (err) {
                                console.log('unabel to get countries');
                            });
                        } else {
                                resObj = setAndOrderCountries(countries,matchesResultObject);
                                return {
                                    'winner':resObj.winner,
                                    'matches':resObj.matches,
                                 };
                        }
                    } else {
                        alert('warning', UNAUTHORIZED);
                        $state.go('login');
                    }
                },
                getUserMatches: function (matches,firstname, lastname) {
                    var matchesResultObject = general.jsonParse(matches);
                    var matchesArr, winner, countries;
                    if (matchesResultObject.success) {
                        countries = authToken.getCountries();
                        matchesResultObject = searchAndReplaceObjectElements(countries, matchesResultObject );
                        matchesArr = matchesResultObject.matches;
                    } else {
                        alert('warning', UNAUTHORIZED);
                        $state.go('login');
                    }
                    if(matchesResultObject.winner !== null){
                        winner = (matchesResultObject.winner !== '' ||
                                 matchesResultObject.winner !== "undefined")?firstname +' '+ lastname +"'s"+ ' winner team is ' + matchesResultObject.winner:"";
                     }else{
                         winner = firstname +' '+ lastname + ' has not selected winner team!';
                     }

                   return {
                       'matches' : matchesArr,
                       'winner' : winner,
                   };
                },
                setAndOrderCountries: function (countries, matchesResultObject) {
                    matchesResultObject = searchAndReplaceObjectElements(countries, matchesResultObject );
                    authToken.setMatches(matchesResultObject);
                    authToken.setFilterCountryFlag(true);
                    var winnertext;
                    var matchesArr = matchesResultObject.matches;
                    var winner = authToken.getWinner();
                    if(winner !== "undefined" && winner !== null && winner != "0") {
                        winnertext = 'My winner team is ' + winner;
                    } else {
                        winnertext = 'I have not selected any winner team! :(';
                    }
                    return {
                        'winner':winnertext,
                        'matches':matchesArr,
                    };
                },
                getUsers: function (resusers) {
                        //console.log('success users' + resusers);
                        var users;
                        var usersResultObject = general.jsonParse(resusers);
                        if (usersResultObject.success) {
                            users = usersResultObject.users;
                        } else {
                            alert('warning', UNAUTHORIZED);
                            $state.go('login');
                        }
                   return {
                       'users' : users,
                   };
                },
        };
        function setAndOrderCountries(countries,matchesResultObject ){
                matchesResultObject = searchAndReplaceObjectElements(countries, matchesResultObject );
                authToken.setMatches(matchesResultObject);
                authToken.setFilterCountryFlag(true);
                var winnertext;
                var matchesArr = matchesResultObject.matches;
                var winner = authToken.getWinner();
                if(winner.length == 1 || !isNaN(Number(winner))){
                    winner = general.getWinnerFromArray(countries);
                }
                if(winner !== "undefined" && winner !== null) {
                    winnertext = 'My winner team is ' + winner;
                } else {
                    winnertext = 'I have not selected any winner team! :(';
                }
                return {
                    'winner':winnertext,
                    'matches':matchesArr,
                };
        }
        function searchAndReplaceObjectElements(countries, matchesResultObject){
                angular.forEach(matchesResultObject.matches, function (value, key) {
                      var ccode = value.team1;
                      var ccode2 = value.team2;
                      for(var key in countries){
                          var flag1=false, flag2 = false;
                          if(ccode === key){
                              value.team1n = countries[key];flag1 = true;
                          }
                          if(ccode2 === key){
                              value.team2n = countries[key];flag2 = true;
                          }
                          if(flag1 && flag2){break;}
                      }
                      //here we set a flag wheter it can be tip for that match or not
                      value = defineIfMatchIsTipAble(value);
                      //here we set a new nice date object
                      value = createReadableDateTime(value);
                      //here we clear the -1 values
                      value = clearNegativeValues(value);
                      //here we will compare the match results vs tips
                      value = defineMatchByTip(value);
                });

                return matchesResultObject;
        }
        function defineMatchByTip(match){
                match.fullhit = false;
                match.halfhit = false;
                match.nohit = false;
                //console.log(match.team2Goals);
                if(match.team1Goals > -1 && match.team2Goals > -1 && match.tip1Goals >  -1 && match.tip2Goals > -1 ){
                    //if full hit
                    if(match.team1Goals === "" || match.team2Goals === ""){return;}
                    if(match.team1Goals === match.tip1Goals && match.team2Goals === match.tip2Goals){
                        match.fullhit = true;
                    }
                    //if the winner is team1
                    else if(match.team1Goals > match.team2Goals &&  match.tip1Goals > match.tip2Goals &&
                            (match.tip1Goals !== match.team1Goals || match.tip2Goals !== match.team2Goals)){
                        match.halfhit = true;
                    }
                    //if the winner is team2
                    else if(match.team1Goals < match.team2Goals &&  match.tip1Goals < match.tip2Goals &&
                            (match.tip1Goals !== match.team1Goals || match.tip2Goals !== match.team2Goals)){
                        match.halfhit = true;
                    }
                    //if the score is equal
                    else if(match.team1Goals === match.team2Goals &&  match.tip1Goals === match.tip2Goals &&
                            (match.tip1Goals !== match.team1Goals && match.tip2Goals !== match.team2Goals)){

                        match.halfhit = true;
                    }
                    //else no hit at all
                    else {
                         match.nohit = true;
                    }

                }
                return match;
        }
        function clearNegativeValues(match){
                try{
                   match.tip1Goals =  (match.tip1Goals === -1)?'':match.tip1Goals;
                   match.tip2Goals =  (match.tip2Goals === -1)?'':match.tip2Goals;
                   match.team1Goals = (match.team1Goals === -1)?'':match.team1Goals;
                   match.team2Goals = (match.team2Goals === -1)?'':match.team2Goals;
                } catch(err) {
                    console.log('date error' + err.message);
                    return;
                }
                return match;
        }
        function createReadableDateTime(match){
                var matchDate, now , nicedate;
                try{
                    matchDate = new Date(match.date);
                    var nn = matchDate.getMinutes();
                    var hh = matchDate.getHours();
                    var dd = matchDate.getDate();
                    var mm = matchDate.getMonth()+1; //January is 0!

                    var yyyy = matchDate.getFullYear();
                    if(dd < 10){
                        dd='0'+dd;
                    }
                    if(mm < 10){
                        mm='0'+mm;
                    }
                    if(nn < 10){
                        nn='0'+nn;
                    }
                    if(hh < 10){
                        hh='0'+hh;
                    }
                    nicedate = dd+'/'+mm+'/'+yyyy+' '+hh+':'+nn;
                    match.nicedate = nicedate;
                } catch(err) {
                    return;
                }
                return match;
        }
        function defineIfMatchIsTipAble(match){
                var matchDate,  matchDateTime, dateOffset,nowWithOffset, now;
                try{
                     now = new Date();
                     matchDate = new Date(match.date);
                     matchDateTime = matchDate.getTime();
                     dateOffset = Number(authToken.getDateTimeOffset());
                     nowWithOffset = now.getTime() + dateOffset;
                } catch(err) {
                    console.log('date error' + err.message);
                    return;
                }
                if(nowWithOffset < matchDateTime){ //if now < start date of the match
                    match.tipable = true;
                }else{
                    match.tipable = false;
                }
                return match;
        }

        return resHandler;
  });
