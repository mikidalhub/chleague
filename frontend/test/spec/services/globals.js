'use strict';

describe('Service: globals', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var globals;
  beforeEach(inject(function (_globals_) {
    globals = _globals_;
  }));

  it('should do something', function () {
    expect(!!globals).toBe(true);
  });

});
