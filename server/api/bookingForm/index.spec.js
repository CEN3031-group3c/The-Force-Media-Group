'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookingFormCtrlStub = {
  index: 'bookingFormCtrl.index',
  show: 'bookingFormCtrl.show',
  create: 'bookingFormCtrl.create',
  update: 'bookingFormCtrl.update',
  destroy: 'bookingFormCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bookingFormIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bookingForm.controller': bookingFormCtrlStub
});

describe('BookingForm API Router:', function() {

  it('should return an express router instance', function() {
    bookingFormIndex.should.equal(routerStub);
  });

  describe('GET /api/bookingForms', function() {

    it('should route to bookingForm.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bookingFormCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bookingForms/:id', function() {

    it('should route to bookingForm.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bookingFormCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bookingForms', function() {

    it('should route to bookingForm.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bookingFormCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bookingForms/:id', function() {

    it('should route to bookingForm.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bookingFormCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bookingForms/:id', function() {

    it('should route to bookingForm.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bookingFormCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bookingForms/:id', function() {

    it('should route to bookingForm.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bookingFormCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
