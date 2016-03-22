'use strict';

var app = require('../..');
import request from 'supertest';

var newStoreItem;

describe('StoreItem API:', function() {

  describe('GET /api/storeItems', function() {
    var storeItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/storeItems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storeItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      storeItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/storeItems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/storeItems')
        .send({
          Name: "This is a new store item",
          Price: 19.99,
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newStoreItem = res.body;
          done();
        });
    });

    it('should respond with the newly created storeItem', function() {
      newStoreItem.Name.should.equal('This is a new store item');
      newStoreItem.Price.should.equal(19.99);
    });

  });

  describe('GET /api/storeItems/:id', function() {
    var storeItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/storeItems/' + newStoreItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          storeItem = res.body;
          done();
        });
    });

    afterEach(function() {
      storeItem = {};
    });

    it('should respond with the requested storeItem', function() {
      newStoreItem.Name.should.equal('This is a new store item');
      newStoreItem.Price.should.equal(19.99);
    });

  });

  describe('PUT /api/storeItems/:id', function() {
    var updatedStoreItem;

    beforeEach(function(done) {
      request(app)
        .put('/api/storeItems/' + newStoreItem._id)
        .send({
          Name: "updated This is a new store item",
          Price: 19.98,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedStoreItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedStoreItem = {};
    });

    it('should respond with the updated storeItem', function() {
      updatedStoreItem.Name.should.equal('updated This is a new store item');
      updatedStoreItem.Price.should.equal(19.98);
    });

  });

  describe('DELETE /api/storeItems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/storeItems/' + newStoreItem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when storeItem does not exist', function(done) {
      request(app)
        .delete('/api/storeItems/' + newStoreItem._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
