import { omit } from 'lodash';

import {LoggerPort} from '@core/domain/common/port';
import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';
import RequestRepositoryPort from '../../../domain/request/port/RequestRepositoryPort';
import Request from '../../../domain/request/Request';
import RequestModel from './RequestModel';

class MongoDbRequestRepositoryAdapter implements RequestRepositoryPort {
  constructor(private readonly logger: LoggerPort) {}

  async exists(id): Promise<boolean> {
    const count = await RequestModel.count({ _id: id });

    return count > 0;
  }

  public async get(id): Promise<Request> {
    const result = await RequestModel.findById(id);

    return this.mapMongoResultToDomainRequest(result);
  }

  public async save(request): Promise<void> {
    const mongoRequest = new RequestModel({
      _id: request.id,
      url: request.url,
      validFrom: request.validFrom,
      state: request.state.name,
    });

    const upsertDocument = omit(mongoRequest.toObject(), ['_id']);

    return RequestModel.findOneAndUpdate(
      { _id: mongoRequest._id },
      upsertDocument,
      { upsert: true, new: true },
    ).then(result => this.logger.info(`Request saved into database [request=${JSON.stringify(result)}]`));
  }

  public async getScheduledRequestsWithValidFromBeforeNow(): Promise<Request[]> {
    const results = await RequestModel.find({
      state: RequestStateEnum.SCHEDULED,
      validFrom: { $lt: Date.now() },
    }).exec();

    return this.mapMongoResultsToDomainRequests(results);
  }

  public async getReadyRequests(): Promise<Request[]> {
    const results = await RequestModel.find({
      state: RequestStateEnum.READY,
    }).exec();

    return this.mapMongoResultsToDomainRequests(results);
  }

  private mapMongoResultsToDomainRequests(results): Request[] {
    return results.map(this.mapMongoResultToDomainRequest);
  }

  private mapMongoResultToDomainRequest(result): Request {
    return new Request(result._id, result.url, result.validFrom, result.state);
  }
}

export default MongoDbRequestRepositoryAdapter;
