'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var adminPictureCtrlStub = {
  index: 'adminPictureCtrl.index',
  show: 'adminPictureCtrl.show',
  create: 'adminPictureCtrl.create',
  update: 'adminPictureCtrl.update',
  destroy: 'adminPictureCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var adminPictureIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './adminPicture.controller': adminPictureCtrlStub
});

describe('AdminPicture API Router:', function() {

  it('should return an express router instance', function() {
    adminPictureIndex.should.equal(routerStub);
  });

  describe('GET /api/adminPictures', function() {

    it('should route to adminPicture.controller.index', function() {
      routerStub.get
        .withArgs('/', 'adminPictureCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/adminPictures/:id', function() {

    it('should route to adminPicture.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'adminPictureCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/adminPictures', function() {

    it('should route to adminPicture.controller.create', function() {
      routerStub.post
        .withArgs('/', 'adminPictureCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/adminPictures/:id', function() {

    it('should route to adminPicture.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'adminPictureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/adminPictures/:id', function() {

    it('should route to adminPicture.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'adminPictureCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/adminPictures/:id', function() {

    it('should route to adminPicture.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'adminPictureCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
