'use strict';

var express = require('express');
var controller = require('./adminPicture.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show);
router.post('/', controller.create);
router.put('/:name', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;