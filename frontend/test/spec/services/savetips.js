'use strict';

describe('Service: savetips', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var savetips;
  beforeEach(inject(function (_savetips_) {
    savetips = _savetips_;
  }));

  it('should do something', function () {
    expect(!!savetips).toBe(true);
  });

});
