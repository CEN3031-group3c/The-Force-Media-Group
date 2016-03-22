'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var StoreItemSchema = new mongoose.Schema({
  Name: String,
  Picture: String,
  Price: Number,
  Description: String,
  Active: Boolean
});

export default mongoose.model('StoreItem', StoreItemSchema);
