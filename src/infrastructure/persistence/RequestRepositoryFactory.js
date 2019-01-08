const { InMemory, MongoDb } = require('./PersistenceType');
const InMemoryRequestRepository = require('./inmemory/InMemoryRequestRepositoryAdapter');
const MongoDbRequestRepository = require('./mongodb/MongoDbRequestRepositoryAdapter');

class RequestRepositoryFactory {
  static create(type, logger) {
    switch (type) {
      case InMemory:
        return new InMemoryRequestRepository();
      case MongoDb:
        return new MongoDbRequestRepository(logger);
      default:
        throw new Error('Invalid peristence type');
    }
  }
}

module.exports = RequestRepositoryFactory;
