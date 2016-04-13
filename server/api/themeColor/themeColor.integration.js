'use strict';

var app = require('../..');
import request from 'supertest';

var newThemeColor;

describe('ThemeColor API:', function() {

  describe('GET /api/themeColors', function() {
    var themeColors;

    beforeEach(function(done) {
      request(app)
        .get('/api/themeColors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          themeColors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      themeColors.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/themeColors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/themeColors')
        .send({
          name: 'New ThemeColor',
          colorCode: 'This is the brand new themeColor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newThemeColor = res.body;
          done();
        });
    });

    it('should respond with the newly created themeColor', function() {
      newThemeColor.name.should.equal('New ThemeColor');
      newThemeColor.colorCode.should.equal('This is the brand new themeColor!!!');
    });

  });

  describe('GET /api/themeColors/:id', function() {
    var themeColor;

    beforeEach(function(done) {
      request(app)
        .get('/api/themeColors/' + newThemeColor._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          themeColor = res.body;
          done();
        });
    });

    afterEach(function() {
      themeColor = {};
    });

    it('should respond with the requested themeColor', function() {
      themeColor.name.should.equal('New ThemeColor');
      themeColor.colorCode.should.equal('This is the brand new themeColor!!!');
    });

  });

  describe('PUT /api/themeColors/:id', function() {
    var updatedThemeColor;

    beforeEach(function(done) {
      request(app)
        .put('/api/themeColors/' + newThemeColor._id)
        .send({
          name: 'Updated ThemeColor',
          colorCode: 'This is the updated themeColor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedThemeColor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedThemeColor = {};
    });

    it('should respond with the updated themeColor', function() {
      updatedThemeColor.name.should.equal('Updated ThemeColor');
      updatedThemeColor.colorCode.should.equal('This is the updated themeColor!!!');
    });

  });

  describe('DELETE /api/themeColors/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/themeColors/' + newThemeColor._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when themeColor does not exist', function(done) {
      request(app)
        .delete('/api/themeColors/' + newThemeColor._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  describe('GET /api/themeColors/:id HANDLE ERROR', function() {
    var themeColor;

    beforeEach(function(done) {
      request(app)
        .get('/api/themeColors/' + 'ThisShouldNeverBeAnID')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          themeColor = res.error;
          done();
        });
    });

    afterEach(function() {
      themeColor = {};
    });

    it('should respond with the error', function() {
      themeColor.text.should.equal('{"message":"Cast to ObjectId failed for value \\"ThisShouldNeverBeAnID\\" at path \\"_id\\"","name":"CastError","kind":"ObjectId","value":"ThisShouldNeverBeAnID","path":"_id"}');
    });
  });

});
