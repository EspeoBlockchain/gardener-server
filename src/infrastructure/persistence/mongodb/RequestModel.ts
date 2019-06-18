import * as mongoose from 'mongoose';

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


export default mongoose.model('Request', new RequestModel());
