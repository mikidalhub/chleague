'use strict';

/**
 * @ngdoc service
 * @name apiApp.constants
 * @description
 * # constants
 * Factory in the apiApp.
 */
angular.module('apiApp')
  .factory('constants', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
