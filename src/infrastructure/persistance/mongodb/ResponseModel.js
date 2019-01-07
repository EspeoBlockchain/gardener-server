const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  _id: String,
  fetchedData: String,
  selectedData: String,
  state: {
    type: String,
    require: true,
  },
});

const ResponseModel = mongoose.model('Response', responseSchema);

module.exports = ResponseModel;
