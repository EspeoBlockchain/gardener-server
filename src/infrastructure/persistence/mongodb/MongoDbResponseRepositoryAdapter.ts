import {LoggerPort} from '@core/domain/common/port';
import Response from '@core/domain/response/Response';
import { omit } from 'lodash';
import ResponseRepositoryPort from '../../../domain/response/port/ResponseRepositoryPort';
import ResponseModel from './ResponseModel';

class MongoDbResponseRepositoryAdapter implements ResponseRepositoryPort {
  constructor(private readonly logger: LoggerPort) {
    this.logger = logger;
  }

  public async save(response): Promise<void> {
    const mongoResponse = new ResponseModel({
      _id: response.requestId,
      fetchedData: response.fetchedData,
      selectedData: response.selectedData,
      state: response.state.name,
    });

    const upsertDocument = omit(mongoResponse.toObject(), ['_id']);

    return ResponseModel.findOneAndUpdate(
      { _id: mongoResponse._id },
      upsertDocument,
      { upsert: true, new: true },
    ).then(result => this.logger.info(`Response saved into database [response=${JSON.stringify(result)}]`));
  }

  public async get(responseId: string): Promise<Response> {
    const responseModel = await ResponseModel.findById(responseId);

    const response = new Response(responseModel._id);
    response.addFetchedData(responseModel.fetchedData);
    response.addSelectedData(responseModel.selectedData);

    return response;
  }
}

export default MongoDbResponseRepositoryAdapter;
