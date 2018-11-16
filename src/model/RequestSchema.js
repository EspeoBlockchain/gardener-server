/* eslint-disable prefer-destructuring */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  _id: String,
  url: {
    type: String,
    require: true,
  },
  validFrom: {
    type: Date,
    default: Date.now,
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  finishedAt: {
    type: Date,
  },
});

const RequestSchema = mongoose.model('Request', requestSchema);
module.exports = RequestSchema;
