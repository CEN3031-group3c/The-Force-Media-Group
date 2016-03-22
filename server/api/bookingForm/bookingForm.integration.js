'use strict';

var app = require('../..');
import request from 'supertest';

var newBookingForm;

describe('BookingForm API:', function() {

  describe('GET /api/bookingForms', function() {
    var bookingForms;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookingForms')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookingForms = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bookingForms.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookingForms', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookingForms')
        .send({
          name: 'New BookingForm',
          info: 'This is the brand new bookingForm!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBookingForm = res.body;
          done();
        });
    });

    it('should respond with the newly created bookingForm', function() {
      newBookingForm.name.should.equal('New BookingForm');
      newBookingForm.info.should.equal('This is the brand new bookingForm!!!');
    });

  });

  describe('GET /api/bookingForms/:id', function() {
    var bookingForm;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookingForms/' + newBookingForm._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookingForm = res.body;
          done();
        });
    });

    afterEach(function() {
      bookingForm = {};
    });

    it('should respond with the requested bookingForm', function() {
      bookingForm.name.should.equal('New BookingForm');
      bookingForm.info.should.equal('This is the brand new bookingForm!!!');
    });

  });

  describe('PUT /api/bookingForms/:id', function() {
    var updatedBookingForm;

    beforeEach(function(done) {
      request(app)
        .put('/api/bookingForms/' + newBookingForm._id)
        .send({
          name: 'Updated BookingForm',
          info: 'This is the updated bookingForm!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBookingForm = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBookingForm = {};
    });

    it('should respond with the updated bookingForm', function() {
      updatedBookingForm.name.should.equal('Updated BookingForm');
      updatedBookingForm.info.should.equal('This is the updated bookingForm!!!');
    });

  });

  describe('DELETE /api/bookingForms/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookingForms/' + newBookingForm._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bookingForm does not exist', function(done) {
      request(app)
        .delete('/api/bookingForms/' + newBookingForm._id)
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
