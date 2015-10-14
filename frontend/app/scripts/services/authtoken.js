'use strict';

angular.module('nodeAngularOauthApp')
        .factory('authToken', function ($window) {
            var storage = $window.localStorage;
            var cachedToken, cachedSession, cachedServerChunk, cachedWinner,cachedDTOffset, cachedFilter, cachedMatches;
            var cachedCountries = {};           
            var userToken = 'userToken';
            var userSession = 'userSession';
            var serverChunk = 'serverChunkSession';
            var winnerSession = 'winnerSession';
            var countrySession = 'countrySession';
            var dateTimeOffsetSession = 'timeOffsetSession';
            var cfilterSession = 'cFilterSession';
            var matchSession = 'matchesSession';

            var authToken = {
                isAuthenticatedSession: function () { //return true
                    return !!this.getSessionId(); //double ! means -> takes the result, cast to bool and inverts it!                   
                },
                setSessionId: function (session) {
                    cachedSession = session;
                    try {
                        storage.setItem(userSession, session);
                        //console.log('loginsession saved' + cachedSession);
                    } catch (exception) {
                        console.log('unable to save the session into local storage');
                    }
                },
                getSessionId: function () {
                    if (!cachedSession) {
                        cachedSession = storage.getItem(userSession);
                    }
                    return cachedSession;
                },
                setToken: function (token) {
                    cachedToken = token;
                    try {
                        storage.setItem(userToken, token);
                    } catch (exception) {
                        console.log('unable to save into local storage');
                    }
                },
                getToken: function () {
                    if (!cachedToken) {
                        cachedToken = storage.getItem(userToken);
                    }
                    return cachedToken;
                },
                setDateTimeOffset: function (offset) {
                    cachedDTOffset = offset;
                    try {
                        storage.setItem(dateTimeOffsetSession, offset);
                    } catch (exception) {
                        console.log('unable to save into local storage');
                    }
                },
                getDateTimeOffset: function () {
                    if (!cachedDTOffset) {
                        cachedDTOffset = storage.getItem(dateTimeOffsetSession);
                    }
                    return cachedDTOffset;
                },
                setCountries: function (session) {
                    cachedCountries = session;
                    try {
                        storage.setItem(countrySession, session);
                    } catch (exception) {
                        console.log('unable to save the session into local storage');
                    }
                },
                getCountries: function () {
                    if (!cachedCountries) {
                        cachedCountries = storage.getItem(countrySession);
                    }
                    return cachedCountries;
                },
                setMatches: function (session) {
                    cachedMatches = session;
                    try {
                        storage.setItem(matchSession, session);
                    } catch (exception) {
                        console.log('unable to save the session into local storage');
                    }
                },
                getMatches: function () {
                    if (!cachedMatches) {
                        cachedMatches = storage.getItem(matchSession);
                    }
                    return cachedMatches;
                },
                setWinner: function (session) {
                    cachedWinner = session;
                    try {
                        storage.setItem(winnerSession, session);
                    } catch (exception) {
                        console.log('unable to save the session into local storage');
                    }
                },
                getWinner: function () {
                    if (!cachedWinner) {
                        cachedWinner = storage.getItem(winnerSession);
                    }
                    return cachedWinner;
                },
                setFilterCountryFlag: function (session) {
                    cachedFilter = session;
                    try {
                        storage.setItem(cfilterSession, session);
                    } catch (exception) {
                        console.log('unable to save the session into local storage');
                    }
                },
                getFilterCountryFlag: function () {
                    if (!cachedFilter) {
                        cachedFilter = storage.getItem(cfilterSession);
                    }
                    return cachedFilter;
                },                
                setServerChunk: function (session) {
                    cachedServerChunk = session;
                    try {
                        storage.setItem(serverChunk, session);
                    } catch (exception) {
                        console.log('unable to save the serverChunkSession into local storage');
                    }
                },
                getServerChunk: function () {
                    if (!cachedServerChunk) {
                        cachedServerChunk = storage.getItem(serverChunk);
                    }
                    return cachedServerChunk;
                },
                
                isAuthenticated: function () { //return true
                    return !!this.getToken; //double ! means -> takes the result, cast to bool and inverts it!
//                    return !!this.getToken; //double ! means -> takes the result, cast to bool and inverts it!
                },                
                removeToken: function () {
                    cachedToken = null;
                    storage.removeItem(userToken);
                },
                removeSession: function () {
                    cachedSession = null;
                    storage.removeItem(userSession);
                },
                removeWinner: function () {
                    cachedWinner = null;
                    storage.removeItem(winnerSession);
                },
                removeCountries: function () {
                    cachedCountries = null;
                    storage.removeItem(countrySession);
                },
                removeAllSessions: function () {
                    cachedToken = null; 
                    cachedSession = null;
                    cachedServerChunk = null;
                    cachedWinner = null;
                    cachedDTOffset = null;
                    cachedFilter = null;                    
                    storage.removeItem(userToken);
                    storage.removeItem(userSession);
                    storage.removeItem(serverChunk);
                    storage.removeItem(winnerSession);
                    storage.removeItem(countrySession);
                    storage.removeItem(dateTimeOffsetSession);
                    storage.removeItem(cfilterSession);
                    storage.removeItem(matchSession);
                },
            };

            return authToken;

        });
