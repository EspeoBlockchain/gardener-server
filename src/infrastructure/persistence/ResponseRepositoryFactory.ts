import LoggerPort from '@core/domain/common/port/LoggerPort';

import InMemoryResponseRepository from './inmemory/InMemoryResponseRepositoryAdapter';
import MongoDBResponseRepository from './mongodb/MongoDbResponseRepositoryAdapter';
import { PersistenceType } from './PersistenceType';

class ResponseRepositoryFactory {
  static create(type: string, logger: LoggerPort) {
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
