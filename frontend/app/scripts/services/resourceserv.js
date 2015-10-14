'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.resourceServ
 * @description
 * # resourceServ
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('resourceServ', function ($http) {

    var serverChunk = "http://premium.smartsoft.ro:8090/SmartBet/";
    var constants = {
      "server": serverChunk,
      "login": serverChunk + "setLogin?userName=", //+ xxx&password=123456
      "validate": serverChunk + "validateSession?sessionId=",
      "matches": serverChunk + "getMatches?sessionId=",
      "countries": serverChunk + "getCountries?sessionId=",
      "usermatches": serverChunk + "getMatchesForUser?sessionId=", // + &userId=
      "currenttime": serverChunk + "WorldCup/getCurrentTime=?sessionId=",
      "users": serverChunk + "getUsers?sessionId=",
      "changepassword": serverChunk + "changePassword?sessionId=", //+ &password=xxx&newPassword=xxx
      "image": serverChunk + "img/", //+image.png
      "setusertip": serverChunk + "setTip?sessionId=", //+&matchID=xxx&tip1=x&tip2=x
      "servertime": serverChunk + "getCurrentTime?sessionId="
    };

    var resourceServ =  {
      login: function (user) {
            return $http({
              url: constants.login + user.username + '&' + 'password=' + user.password,
              method:"POST",
              headers: {
                //'Authorization': 'Basic dGVzdDp0ZXN0',
                //'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              },
              data: {
                'Code': 'test data'
              }
            });
        //return $http.post(constants.login + user.username + '&' + 'password=' + user.password);
      },
      validateSession: function () {
        return $http.post(constants.validate);
      },
      getOwnMatches: function () {
        return $http.post(constants.matches);
      },
      getCountries: function () {
        return $http.post(constants.countries);
      },
      getUserMatches: function () {
        return $http.post(constants.usermatches);
      },
      getCurrentTime: function () {
        return $http.post(constants.currenttime);
      },
      getUsers: function () {
        return $http.post(constants.users);
      },
      setChangePassword: function () {
        return $http.post(constants.changepassword);
      },
      getImage: function () {
        return $http.post(constants.image);
      },
      setUserTip: function () {
        return $http.post(constants.setusertip);
      },
      getServerTime: function () {
        return $http.post(constants.servertime);
      },
    };
    return resourceServ;
  });
