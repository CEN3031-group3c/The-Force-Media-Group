'use strict';

import app from '../..';
import User from '../user/user.model';
import request from 'supertest';

var newBlog;

describe('Blog API:', function() {
  var adminUser, token;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      adminUser = new User({
        provider: 'local',
        role: 'admin',
        name: 'I AM ADMIN',
        email: 'admin@admin.com',
        password: 'admin123'
      });

      return adminUser.save();
    });
  });

  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'admin@admin.com',
        password: 'admin123'
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

  describe('GET /api/blogs', function() {
    var blogs;

    beforeEach(function(done) {
      request(app)
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          blogs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      blogs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/blogs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/blogs')
        .set('authorization', 'Bearer ' + token)
        .send({
          title: 'New Blog',
          body: 'This is the brand new blog!!!',
          published: true
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBlog = res.body;
          done();
        });
    });

    it('should respond with the newly created blog', function() {
      newBlog.title.should.equal('New Blog');
      newBlog.body.should.equal('This is the brand new blog!!!');
      newBlog.published.should.equal(true);
    });

  });

  describe('GET /api/blogs/:id', function() {
    var blog;

    beforeEach(function(done) {
      request(app)
        .get('/api/blogs/' + newBlog._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          blog = res.body;
          done();
        });
    });

    afterEach(function() {
      blog = {};
    });

    it('should respond with the requested blog', function() {
      blog.title.should.equal('New Blog');
      blog.body.should.equal('This is the brand new blog!!!');
      blog.published.should.equal(true);
    });

  });

  describe('PUT /api/blogs/:id', function() {
    var updatedBlog;

    beforeEach(function(done) {
      request(app)
        .put('/api/blogs/' + newBlog._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          title: 'Updated Blog',
          body: 'This is the updated blog!!!',
          published: false
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBlog = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBlog = {};
    });

    it('should respond with the updated blog', function() {
      updatedBlog.title.should.equal('Updated Blog');
      updatedBlog.body.should.equal('This is the updated blog!!!');
      updatedBlog.published.should.equal(false);
    });

  });

  describe('DELETE /api/blogs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/blogs/' + newBlog._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when blog does not exist', function(done) {
      request(app)
        .delete('/api/blogs/' + newBlog._id)
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

});
