/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  request_id: mongoose.Schema.Types.ObjectId,
  value: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const DataSchema = mongoose.model('Data', dataSchema);
module.exports = DataSchema;
