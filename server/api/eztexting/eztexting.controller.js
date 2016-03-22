/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/eztextings              ->  index
 * POST    /api/eztextings              ->  create
 * GET     /api/eztextings/:id          ->  show
 * PUT     /api/eztextings/:id          ->  update
 * DELETE  /api/eztextings/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var request = require('request');


// Send an EZTexting text
export function sendTextToGroup(req, res) {

  var remote = request({
    method: 'POST',
    uri: 'https://app.eztexting.com/sending/messages',
    form: {
      format: 'json',
      User: 'jarmonedavis',
      Password: 'gavin',
      Groups: 'Test',
      Message: req.params.messageText
    },
    json: true
  }, function(err, response, body) {
    res.send(body);
    console.log(err);
  });

}

// Send an EZTexting text
export function sendConfirmationMessage(req, res) {

  var remote = request({
    method: 'POST',
    uri: 'https://app.eztexting.com/sending/messages',
    form: {
      format: 'json',
      User: 'jarmonedavis',
      Password: 'gavin',
      PhoneNumbers: req.params.phoneNumber,
      Message: 'Congratulations! You have been subscribed to receive text message updates from Jarmone Davis.'
    },
    json: true
  }, function(err, response, body) {
    res.send(body);
    console.log(err);
  });

}

export function createContact(req, res) {
  var remote = request({
    method: 'POST',
    uri: 'https://app.eztexting.com/contacts',
    form: {
      format: 'json',
      User: 'jarmonedavis',
      Password: 'gavin',
      PhoneNumber: req.params.phoneNumber,
      Groups: 'Test'
    },
    json: true
  }, function(err, response, body) {
    res.send(body);
    console.log(err);
  });
}
