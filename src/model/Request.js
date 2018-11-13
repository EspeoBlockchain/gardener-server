const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema;

const Request = new RequestSchema({
  txId: {
    type: String,
    unique: true,
    required: true,
  },
  validFrom: {
    type: Date,
    default: Date.now,
  },
  errorCode: {
    type: String,
    required: false,
  },
});

const assignRequestToModel = mongoose.model('request', Request);

module.exports = assignRequestToModel;
