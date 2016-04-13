'use strict';

import app from '../..';
import User from '../user/user.model';
import request from 'supertest';

var newComment;

describe('Comment API:', function() {
  var user, token;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        provider: 'local',
        name: 'I AM USER',
        email: 'test@example.com',
        password: 'test123'
      });

      return user.save();
    });
  });

  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@example.com',
        password: 'test123'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  describe('GET /api/comments', function() {
    var comments;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      comments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/comments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/comments')
        .set('authorization', 'Bearer ' + token)
        .send({
          userId: 'userId 1',
          blogId: 'blogId 1',
          body: 'This is the brand new comment!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newComment = res.body;
          done();
        });
    });

    it('should respond with the newly created comment', function() {
      newComment.userId.should.equal('userId 1');
      newComment.blogId.should.equal('blogId 1');
      newComment.body.should.equal('This is the brand new comment!!!');
    });

  });

  describe('GET /api/comments/:id', function() {
    var comment;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments/' + newComment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comment = res.body;
          done();
        });
    });

    afterEach(function() {
      comment = {};
    });

    it('should respond with the requested comment', function() {
      comment.userId.should.equal('userId 1');
      comment.blogId.should.equal('blogId 1');
      comment.body.should.equal('This is the brand new comment!!!');
    });

  });

  describe('PUT /api/comments/:id', function() {
    var updatedComment;

    beforeEach(function(done) {
      request(app)
        .put('/api/comments/' + newComment._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          userId: 'userId 1 updated',
          blogId: 'blogId 1 updated',
          body: 'This is the updated comment!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedComment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedComment = {};
    });

    it('should respond with the updated comment', function() {
      updatedComment.userId.should.equal('userId 1 updated');
      updatedComment.blogId.should.equal('blogId 1 updated');
      updatedComment.body.should.equal('This is the updated comment!!!');
    });

  });

  describe('DELETE /api/comments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/comments/' + newComment._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when comment does not exist', function(done) {
      request(app)
        .delete('/api/comments/' + newComment._id)
        .set('authorization', 'Bearer ' + token)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

  describe('GET /api/comments/:id HANDLE ERROR', function() {
    var comment;

    beforeEach(function(done) {
      request(app)
        .get('/api/comments/' + 'ThisShouldNeverBeAnID')
        .expect(500)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          comment = res.error;
          done();
        });
    });

    afterEach(function() {
      comment = {};
    });

    it('should respond with the error', function() {
      comment.text.should.equal('{"message":"Cast to ObjectId failed for value \\"ThisShouldNeverBeAnID\\" at path \\"_id\\"","name":"CastError","kind":"ObjectId","value":"ThisShouldNeverBeAnID","path":"_id"}');
    });

  });

});
