import { omit } from 'lodash';
import ResponseRepositoryPort from '../../../domain/response/port/ResponseRepositoryPort';
import ResponseModel from './ResponseModel';


class MongoDbResponseRepositoryAdapter extends ResponseRepositoryPort {
  constructor(logger) {
    super();
    this.logger = logger;
  }

  save(response) {
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
}

export default MongoDbResponseRepositoryAdapter;
