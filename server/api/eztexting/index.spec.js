'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eztextingCtrlStub = {
  sendConfirmationMessage: 'eztextingCtrl.sendConfirmationMessage',
  createContact: 'eztextingCtrl.createContact',
  sendTextToGroup: 'eztextingCtrl.sendTextToGroup'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eztextingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './eztexting.controller': eztextingCtrlStub
});

describe('Eztexting API Router:', function() {

  it('should return an express router instance', function() {
    eztextingIndex.should.equal(routerStub);
  });

  describe('GET /api/eztextings/sendConfirmationMessage/:phoneNumber', function() {

    it('should route to eztexting.controller.sendConfirmationMessage', function() {
      routerStub.get
        .withArgs('/sendConfirmationMessage/:phoneNumber', 'eztextingCtrl.sendConfirmationMessage')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/eztextings/createContact/:phoneNumber', function() {

    it('should route to eztexting.controller.createContact', function() {
      routerStub.get
        .withArgs('/createContact/:phoneNumber', 'eztextingCtrl.createContact')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/eztextings/sendTextToGroup/:messageText', function() {

    it('should route to eztexting.controller.sendTextToGroup', function() {
      routerStub.get
        .withArgs('/sendTextToGroup/:messageText', 'eztextingCtrl.sendTextToGroup')
        .should.have.been.calledOnce;
    });

  });

});
