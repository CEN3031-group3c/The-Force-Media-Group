'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var storeItemCtrlStub = {
  index: 'storeItemCtrl.index',
  show: 'storeItemCtrl.show',
  create: 'storeItemCtrl.create',
  update: 'storeItemCtrl.update',
  destroy: 'storeItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var storeItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './storeItem.controller': storeItemCtrlStub
});

describe('StoreItem API Router:', function() {

  it('should return an express router instance', function() {
    storeItemIndex.should.equal(routerStub);
  });

  describe('GET /api/storeItems', function() {

    it('should route to storeItem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'storeItemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/storeItems/:id', function() {

    it('should route to storeItem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'storeItemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/storeItems', function() {

    it('should route to storeItem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'storeItemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/storeItems/:id', function() {

    it('should route to storeItem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'storeItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/storeItems/:id', function() {

    it('should route to storeItem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'storeItemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/storeItems/:id', function() {

    it('should route to storeItem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'storeItemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
