'use strict';

import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  published: Boolean,
  createdAt: String,
  updatedAt: String
});

export default mongoose.model('Blog', BlogSchema);
