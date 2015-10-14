'use strict';

angular.module('nodeAngularOauthApp')
        .controller('HeaderCtrl', function ($scope, authToken) {
            var sessId = authToken.getSessionId();
            $scope.isAuthenticated = (sessId && sessId !== '' && sessId !== null)?true:false;
            $scope.$on('logevent', function() {
                var sessId = authToken.getSessionId();
                $scope.isAuthenticated = (sessId && sessId !== '' && sessId !== null)?true:false;
            });
            
        });
        