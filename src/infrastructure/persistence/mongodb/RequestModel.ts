const mongoose = require('mongoose');

class RequestModel extends mongoose.Schema {
  constructor() {
    super({
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
  }
}


module.exports = mongoose.model('Request', new RequestModel());
