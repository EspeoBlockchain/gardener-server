const _ = require('lodash');

const RequestRepositoryPort = require('../../../domain/request/port/RequestRepositoryPort');
const { SCHEDULED, READY } = require('../../../domain/request/RequestStateEnum');
const RequestModel = require('./RequestModel');
const Request = require('../../../domain/request/Request');

class MongoDBRequestRepositoryAdapter extends RequestRepositoryPort {
  constructor(logger) {
    super();
    this.logger = logger;
  }

  async exists(id) {
    const count = await RequestModel.count({ _id: id });

    return count > 0;
  }

  save(request) {
    const mongoRequest = RequestModel({
      _id: request.id,
      url: request.url,
      validFrom: request.validFrom,
      state: request.state.name,
    });

    const upsertDocument = _.omit(mongoRequest.toObject(), ['_id']);

    return RequestModel.findOneAndUpdate(
      { _id: mongoRequest._id },
      upsertDocument,
      { upsert: true, new: true },
    ).then(result => this.logger.info(`Request saved into database [request=${JSON.stringify(result)}]`));
  }

  async getScheduledRequestsWithValidFromBeforeNow() {
    const results = await RequestModel.find({
      state: SCHEDULED,
      validFrom: { $lt: Date.now() },
    }).exec();

    return this._mapMongoResultsToDomainRequests(results);
  }

  async getReadyRequests() {
    const results = await RequestModel.find({
      state: READY,
    }).exec();

    return this._mapMongoResultsToDomainRequests(results);
  }

  _mapMongoResultsToDomainRequests(results) {
    return results
      .map(result => new Request(result._id, result.url, result.validFrom, result.state));
  }
}

module.exports = MongoDBRequestRepositoryAdapter;
