/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const RequestSchema = require('./requestSchema');
const logger = require('../../src/config/winston');

class RequestDao {
  saveRequest(url, ended) {
    const newRequest = RequestSchema({
      _id: new mongoose.Types.ObjectId(),
      url,
      ended,
    });

    newRequest.save((err) => {
      if (err) throw err;

      logger.info('Request successfully saved');
    });
  }

  findSingleRequestUrlByEndDate(end) {
    return RequestSchema.find({ ended: { $lte: end } }, (err, requestObject) => {
      if (err) throw err;

      if (requestObject.status && requestObject.request.length > 0) {
        const request = requestObject.request[0];
        logger.info(`Found request: ${request}`);

        return request.url;
      }

      return '';
    });
  }
}

module.exports = RequestDao;
