'use strict';

/**
 * @ngdoc service
 * @name nodeAngularOauthApp.observerService
 * @description
 * # observerService observerPattern to handle the registered methods
 * Factory in the nodeAngularOauthApp.
 */
angular.module('nodeAngularOauthApp')
  .factory('observerService', function ($http, alert, authToken,$rootScope) {
        var observerCallbacks = [];  
        var observerTipsCallbacks = [];
        var rowIndex = null;
        var observerService = {
            registerObserverCallback : function (callback) { //return true
                observerCallbacks.push(callback);                                                  
            },
            registerTipsObserverCallback : function (callback) { //return true                               
                observerTipsCallbacks.push(callback);                 
            },
            //call this when you know log event occured
            notifyObservers : function(){
              angular.forEach(observerCallbacks, function(callback){
                callback();
              });
            },
             //call this when you know tip event has been occured
            notifyTipObserver : function(){
              angular.forEach(observerTipsCallbacks, function(callback){
                callback();
              });
            },
            //example of when you may want to notify observers                
            triggerLoggingObserverEvents : function(){
              this.notifyObservers();
            },
            triggerTipObserverEvents : function(index){
              rowIndex = index;
              this.notifyTipObserver();
            },            
            authEventTrigger: function () { //triggerable function                                                             
                $rootScope.$broadcast('logevent'); //auth event occured
            },
            tipSuccessTrigger: function () { //triggerable function                                                             
                $rootScope.$broadcast('tipsuccessevent',rowIndex); //auth event occured
            }
    };
    return observerService;
  });
