angular.module('nodeAngularOauthApp').config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
    'use strict';
    $urlRouterProvider.otherwise('/');
    $stateProvider
            .state('main', {
                url: '/',
                controller: 'MainCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
            })
            .state('logout', {
                url: '/logout',
                controller: 'LogoutCtrl'
            })
            .state('matches', {
                url: '/matches',
                templateUrl: 'views/matches.html',
                controller: 'MatchesCtrl'
            })
            .state('standings', {
                url: '/standings',
                templateUrl: 'views/standings.html',
                controller: 'StandingsCtrl'
            })
            .state('changepassword', {
                url: '/changepassword',
                templateUrl: 'views/changepassword.html',
                controller: 'ChangepasswordCtrl'
            })
            .state('weather', {
              url: '/weather',
              templateUrl: 'views/weather.html',
              controller: 'weatherCtrl'
            });

        $httpProvider.interceptors.push('authInterceptor');
    })
//        .constant('API_URL', 'http://192.168.0.102:3000/')
        .constant('API_URL', 'http://192.168.229.103:3000/')
        .constant('UNAUTHORIZED', 'Unauthorized access! Please Log In!');
//        .constant('API_URL', 'http://192.168.230.198:8080/WorldCup/');

