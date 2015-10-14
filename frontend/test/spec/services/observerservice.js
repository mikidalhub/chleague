'use strict';

describe('Service: observerService', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var observerService;
  beforeEach(inject(function (_observerService_) {
    observerService = _observerService_;
  }));

  it('should do something', function () {
    expect(!!observerService).toBe(true);
  });

});
