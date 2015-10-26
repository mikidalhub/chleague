'use strict';
/**
 * Login -> if login was success then we get a sessionId and after that we call asynchronously the others
 * After we get all the countries than we save to local storage and save the logged in user selected winner
 * @param {type} param1
 * @param {type} param2
 */
angular.module('nodeAngularOauthApp')
        .controller('LoginCtrl', function ($scope, loginService) {
            $scope.submit = function () {
                loginService.login( $scope.username, $scope.password );
            };
        });
