import { PersistenceType } from './PersistenceType';
import InMemoryResponseRepository from './inmemory/InMemoryResponseRepositoryAdapter';
import MongoDBResponseRepository from './mongodb/MongoDbResponseRepositoryAdapter';

class ResponseRepositoryFactory {
  static create(type, logger) {
    switch (type) {
      case PersistenceType.InMemory:
        return new InMemoryResponseRepository();
      case PersistenceType.MongoDb:
        return new MongoDBResponseRepository(logger);
      default:
        throw new Error('Invalid persistence type');
    }
  }
}

export default ResponseRepositoryFactory;
