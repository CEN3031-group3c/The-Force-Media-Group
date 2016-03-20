/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bookingForms              ->  index
 * POST    /api/bookingForms              ->  create
 * GET     /api/bookingForms/:id          ->  show
 * PUT     /api/bookingForms/:id          ->  update
 * DELETE  /api/bookingForms/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import BookingForm from './bookingForm.model';
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of BookingForms
export function index(req, res) {
  BookingForm.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single BookingForm from the DB
export function show(req, res) {
  BookingForm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new BookingForm in the DB
export function create(req, res) {
  BookingForm.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing BookingForm in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  BookingForm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a BookingForm from the DB
export function destroy(req, res) {
  BookingForm.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


// create reusable transporter object using the default SMTP transport

//Need to refresh accessToken which changes every hour.
// login
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'forcemediagroupdb@gmail.com',
            clientId: '1049619144734-uun0kb3kebr8coi3jrs3aqgp17gfcop8.apps.googleusercontent.com',
            clientSecret: '-iNcYB0V2sStaADp3zOrQ3L3',
            refreshToken: '1/HXOOpKwTS3-oztzSxIwcMTph5awFSpkp-UUtuZRAJM0MEudVrK5jSpoR30zcRFq6',
            accessToken: 'ya29.pwLTEs8BGzTkM1MZE1S40NMp_732Y1aSyVlcqv1iPz0aIyhfT7MIYUzS2HHPio3m2Q'
        })
    }
});
// setup e-mail data with unicode symbols

export function sendBookingEmail(req, res){

  var mailOptions = {
    from: 'forcemediagroupdb@gmail.com', // sender address
    to: 'mrdjmeyers@gmail.com', // list of receivers
    subject: 'New Booking Request', // Subject line
    text: 'Requester Name: ' + req.params.propName + '\nRequester Email: ' + req.params.email + '\nRequester Phone: ' + req.params.phoneNum + '\nEvent Type: ' + req.params.eventType + '\nEvent Description: ' + req.params.descript + '\nEvent Date/Time: ' + req.params.eventDate // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      res.send(error);
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
    res.send(mailOptions);
  });
}
