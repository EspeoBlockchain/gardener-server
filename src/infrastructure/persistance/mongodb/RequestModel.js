const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  _id: String,
  url: {
    type: String,
    require: true,
  },
  validFrom: {
    type: Date,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
});

const RequestModel = mongoose.model('Request', requestSchema);

module.exports = RequestModel;
