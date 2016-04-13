'use strict';

import mongoose from 'mongoose';

var ThemeColorSchema = new mongoose.Schema({
  name: String,
  colorCode: String
});

export default mongoose.model('ThemeColor', ThemeColorSchema);
