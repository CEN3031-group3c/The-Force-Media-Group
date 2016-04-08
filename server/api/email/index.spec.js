'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var emailCtrlStub = {
  index: 'emailCtrl.index',
  show: 'emailCtrl.show',
  create: 'emailCtrl.create',
  update: 'emailCtrl.update',
  destroy: 'emailCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var emailIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './email.controller': emailCtrlStub
});

describe('Email API Router:', function() {

  it('should return an express router instance', function() {
    emailIndex.should.equal(routerStub);
  });

});
