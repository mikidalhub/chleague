'use strict';

describe('Service: resHandler', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var resHandler;
  beforeEach(inject(function (_resHandler_) {
    resHandler = _resHandler_;
  }));

  it('should do something', function () {
    expect(!!resHandler).toBe(true);
  });

});
