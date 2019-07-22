import * as mongoose from 'mongoose';
import { PersistenceType } from './PersistenceType';

class PersistenceConnectionInitializer {
  init(type: any, options: any) {
    switch (type) {
      case PersistenceType.MongoDb:
        this._initMongo(options);
        break;
    }
  }

  _initMongo({ databaseUrl, databaseName }: any) {
    mongoose.connect(`mongodb://${databaseUrl}/${databaseName}`, { useNewUrlParser: true });
  }
}

export default PersistenceConnectionInitializer;
