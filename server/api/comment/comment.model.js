'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CommentSchema = new mongoose.Schema({
  userId: String,
  blogId: String,
  body: String

});

export default mongoose.model('Comment', CommentSchema);
