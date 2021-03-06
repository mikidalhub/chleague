'use strict';

describe('Directive: loginServe', function () {

  // load the directive's module
  beforeEach(module('nodeAngularOauthApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<login-serve></login-serve>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loginServe directive');
  }));
});
