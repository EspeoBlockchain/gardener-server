/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const DataSchema = require('./dataSchema');

class DataDao {
  saveData(requestId, data) {
    const newData = DataSchema({
      _id: new mongoose.Types.ObjectId(),
      request_id: requestId,
      data,
    });

    newData.save((err) => {
      if (err) throw err;

      console.log('Data successfully saved');
    });
  }

  findDataByRequestId(requestId) {
    return DataSchema.find({ request_id: requestId }, (err, dataObject) => {
      if (err) throw err;

      if (dataObject.status && dataObject.data.length > 0) {
        const data = dataObject.data[0];
        console.log(`Found data: ${data}`);
        return data.value;
      }
      return '';
    });
  }
}

module.exports = DataDao;
