'use strict';

describe('Controller: MatchesCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularOauthApp'));

  var MatchesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MatchesCtrl = $controller('MatchesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MatchesCtrl.awesomeThings.length).toBe(3);
  });
});
