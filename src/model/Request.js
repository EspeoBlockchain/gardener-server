const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema;

const Request = new RequestSchema({
  hash: {
    type: String,
    unique: true,
    required: true,
  },
  validFrom: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const assignRequestToModel = mongoose.model('request', Request);

module.exports = assignRequestToModel;
