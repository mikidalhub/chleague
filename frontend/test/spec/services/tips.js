'use strict';

describe('Service: tips', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var tips;
  beforeEach(inject(function (_tips_) {
    tips = _tips_;
  }));

  it('should do something', function () {
    expect(!!tips).toBe(true);
  });

});
