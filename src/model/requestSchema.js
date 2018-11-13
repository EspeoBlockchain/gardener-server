const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: {
    type: String,
    require: true,
  },
  started: {
    type: Date,
    default: Date.now,
  },
  ended: {
    type: Date,
  },
});

const RequestSchema = mongoose.model('Request', requestSchema);
module.exports = RequestSchema;
