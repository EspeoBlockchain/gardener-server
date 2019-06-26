import * as mongoose from 'mongoose';
import { PersistenceType } from './PersistenceType';

class PersistenceConnectionInitializer {
  init(type, options) {
    // eslint-disable-next-line default-case
    switch (type) {
      case PersistenceType.MongoDb:
        this._initMongo(options);
        break;
    }
  }

  _initMongo({ databaseUrl, databaseName }) {
    mongoose.connect(`mongodb://${databaseUrl}/${databaseName}`, { useNewUrlParser: true });
  }
}

export default PersistenceConnectionInitializer;
