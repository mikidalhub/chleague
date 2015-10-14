'use strict';

describe('Service: resourceServ', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var resourceServ;
  beforeEach(inject(function (_resourceServ_) {
    resourceServ = _resourceServ_;
  }));

  it('should do something', function () {
    expect(!!resourceServ).toBe(true);
  });

});
