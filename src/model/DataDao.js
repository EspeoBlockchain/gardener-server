/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const DataSchema = require('./DataSchema');
const logger = require('../../src/config/winston');

class DataDao {
  saveData(requestId, data) {
    const newData = DataSchema({
      _id: new mongoose.Types.ObjectId(),
      request_id: requestId,
      ...data,
    });

    return newData.save().then((result) => {
      logger.info(`Data for request ${result.request_id} successfully saved`);

      return result;
    });
  }

  findDataByRequestId(requestId) {
    return DataSchema.findOne({ request_id: requestId }).exec();
  }
}

module.exports = DataDao;
