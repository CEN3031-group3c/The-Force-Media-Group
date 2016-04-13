'use strict';

var express = require('express');
var controller = require('./storeItem.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/updateStoreItem/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.put('/', controller.createCharge);
router.put('/validateAddress/', controller.validateAddress);

module.exports = router;
