/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const RequestSchema = require('./requestSchema');
const logger = require('../../src/config/winston');

class RequestDao {
  saveRequest({ id, url, validFrom, startedAt }) {
    const newRequest = RequestSchema({
      _id: id,
      url,
      validFrom,
      startedAt,
    });

    newRequest.save((err) => {
      if (err) throw err;

      logger.info('Request successfully saved');
    });
  }

  findSingleRequestReadyToExecute(dateTime) {
    return RequestSchema.find({ validFrom: { $lte: dateTime } }, (err, requestObject) => {
      if (err) throw err;

      if (requestObject.status && requestObject.request.length > 0) {
        const request = requestObject.request[0];
        logger.info(`Found request: ${request}`);

        return request;
      }

      return '';
    });
  }
}

module.exports = RequestDao;
