import mongoose from 'mongoose';
import { PersistenceType } from './PersistenceType';

class PersistenceConnectionInitializer {
  init(type: string, options: { databaseUrl: string, databaseName: string }) {
    switch (type) {
      case PersistenceType.MongoDb:
        this.initMongo(options);
        break;
    }
  }

  private initMongo({ databaseUrl, databaseName }: { databaseUrl: string, databaseName: string }) {
    mongoose.connect(`mongodb://${databaseUrl}/${databaseName}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
    });
  }
}

export default PersistenceConnectionInitializer;
