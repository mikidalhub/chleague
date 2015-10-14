'use strict';

describe('Controller: StandingsCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularOauthApp'));

  var StandingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StandingsCtrl = $controller('StandingsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StandingsCtrl.awesomeThings.length).toBe(3);
  });
});
