'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  userId: String,
  blogId: String,
  body: String

});

export default mongoose.model('Comment', CommentSchema);
