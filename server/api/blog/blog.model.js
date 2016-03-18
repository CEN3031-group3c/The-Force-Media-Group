'use strict';

import mongoose from 'mongoose';

var BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  published: Boolean
});

export default mongoose.model('Blog', BlogSchema);
