/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/emails              ->  index
 * POST    /api/emails              ->  create
 * GET     /api/emails/:id          ->  show
 * PUT     /api/emails/:id          ->  update
 * DELETE  /api/emails/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Email from './email.model';
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtpTransport = require('nodemailer-smtp-transport');

var generator = xoauth2.createXOAuth2Generator({
  user: 'forcemediagroupdb@gmail.com',
  clientId: '1049619144734-pqo3hkf4dr5eomguc3c69opnsbcaasd4.apps.googleusercontent.com',
  clientSecret: 'dKIQNFX4aN_GwZtr0MhAI1wA',
  refreshToken: '1/i_43lVYBgH_BFeIJfnZ_b8KJbva39ZZbsKoTHymqXNoMEudVrK5jSpoR30zcRFq6',
  access_type: 'offline'
});
generator.on('token', function(token){
  console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
    xoauth2: generator
  }
}));

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}


// send mail

export function sendEmail(req, res){
  console.log(req.body);
  transporter.sendMail({
    from: 'forcemediagroupdb@gmail.com', // sender address
    to: req.body.sendTo, // list of receivers
    subject: req.body.subject, // Subject line
    html: req.body.emailBody
  }, function(error, response) {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      console.log('Message sent');
      res.json(response);
    }
  });




}
