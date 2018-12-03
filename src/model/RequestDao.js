/* eslint-disable class-methods-use-this */
const RequestSchema = require('./RequestSchema');
const logger = require('../../src/config/winston');
const MongoErrorCode = require('../utils/MongoErrorCode');

class RequestDao {
  saveRequest({
    id, url, validFrom, startedAt,
  }) {
    const newRequest = RequestSchema({
      _id: id,
      url,
      validFrom,
      startedAt,
    });

    return newRequest.save()
      .then((result) => {
        // eslint-disable-next-line no-underscore-dangle
        logger.info(`Request ${result._id} successfully saved`);

        return result;
      })
      .catch((error) => {
        switch (error.code) {
          case MongoErrorCode.DUPLICATION:
            logger.info(`Request ${id} duplication`);
            break;
          default:
            throw error;
        }
      });
  }

  findSingleRequestReadyToExecute(dateTime) {
    return RequestSchema.findOne({ validFrom: { $lte: dateTime }, finishedAt: null }).exec();
  }

  tagRequestAsFinished(id) {
    return RequestSchema.findOneAndUpdate({ _id: id }, { $set: { finishedAt: Date.now() } });
  }
}

module.exports = RequestDao;
