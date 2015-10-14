'use strict';

describe('Service: loginHandler', function () {

  // load the service's module
  beforeEach(module('nodeAngularOauthApp'));

  // instantiate service
  var loginHandler;
  beforeEach(inject(function (_loginHandler_) {
    loginHandler = _loginHandler_;
  }));

  it('should do something', function () {
    expect(!!loginHandler).toBe(true);
  });

});
