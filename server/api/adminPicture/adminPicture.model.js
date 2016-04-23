'use strict';

import mongoose from 'mongoose';

var AdminPictureSchema = new mongoose.Schema({
  url: String,
  name: String
});

export default mongoose.model('AdminPicture', AdminPictureSchema);
