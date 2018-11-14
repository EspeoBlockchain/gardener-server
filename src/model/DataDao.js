/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const DataSchema = require('./dataSchema');
const logger = require('../../src/config/winston');

class DataDao {
  saveData(requestId, data) {
    const newData = DataSchema({
      _id: new mongoose.Types.ObjectId(),
      request_id: requestId,
      data,
    });

    newData.save((err) => {
      if (err) throw err;

      logger.info('Data successfully saved');
    });
  }

  findDataByRequestId(requestId) {
    return DataSchema.find({ request_id: requestId }, (err, dataObject) => {
      if (err) throw err;

      if (dataObject.status && dataObject.data.length > 0) {
        const data = dataObject.data[0];
        logger.info(`Found data: ${data}`);

        return data.value;
      }
      return '';
    });
  }
}

module.exports = DataDao;
