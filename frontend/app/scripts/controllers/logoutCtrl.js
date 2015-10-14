'use strict';


angular.module('nodeAngularOauthApp')
        .controller('LogoutCtrl', function (authToken, $state, observerService) {
            authToken.removeAllSessions();
            observerService.triggerLoggingObserverEvents();
            $state.go('login');
        });
