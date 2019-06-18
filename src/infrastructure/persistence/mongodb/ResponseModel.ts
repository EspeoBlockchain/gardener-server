import * as mongoose from 'mongoose';

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

export default mongoose.model('Response', new ResponseModel());
