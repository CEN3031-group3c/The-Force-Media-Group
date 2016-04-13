'use strict';

var request = require('request');

// Send an EZTexting text
export function sendConfirmationMessage(req, res) {

  request({
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

  request({
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

// Send an EZTexting text
export function sendTextToGroup(req, res) {

  request({
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
