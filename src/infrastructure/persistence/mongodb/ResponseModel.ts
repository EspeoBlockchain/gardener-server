const mongoose = require('mongoose');

class ResponseModel extends mongoose.Schema {
  constructor() {
    super({
      _id: String,
      fetchedData: String,
      selectedData: String,
      state: {
        type: String,
        require: true,
      },
    });
  }
}

module.exports = mongoose.model('Response', new ResponseModel());
