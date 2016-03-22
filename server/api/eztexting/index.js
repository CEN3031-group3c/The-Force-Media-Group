'use strict';

var express = require('express');
var controller = require('./eztexting.controller');

var router = express.Router();

router.get('/sendConfirmationMessage/:phoneNumber', controller.sendConfirmationMessage);

router.get('/createContact/:phoneNumber', controller.createContact);

router.get('/sendTextToGroup/:messageText', controller.sendTextToGroup);

module.exports = router;
