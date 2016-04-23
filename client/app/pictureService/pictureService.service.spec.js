'use strict';

describe('Service: pictureService', function () {

  // Load the service's module
  beforeEach(module('fmgApp'));

  // Instantiate service
  var pictureService;
  beforeEach(inject(function (_pictureService_) {
    pictureService = _pictureService_;
  }));

  it('should do something', function () {
    expect(!!pictureService).toBe(true);
  });

});
