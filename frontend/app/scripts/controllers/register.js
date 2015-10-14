'use strict';

angular.module('nodeAngularOauthApp')
        .controller('RegisterCtrl', function ($scope, $rootScope, $http, alert, authToken) { //alert, authToken services or factories
            $scope.submit = function () {
                var url = 'http://localhost:3000/register/';
                var user = {
                    email: $scope.email,
                    password: $scope.password
                };
                $http.post(url, user)
                        .success(function (res) {                            
                            authToken.setToken(res.token); //token store in local storage
                            alert('success', 'Ok!', 'You are now registered ' + res.user.email);
                            console.log('good registration and set token:' + authToken.getToken());
                        })
                        .error(function (err) {
                            console.log('error on registration' + err);
                            alert('warning', 'Opps!', 'Could not register');
                        });
            };
        });
