const { InMemory, MongoDB } = require('./PersistenceType');
const InMemoryRequestRepository = require('./inmemory/InMemoryRequestRepositoryAdapter');
const MongoDBRequestRepository = require('./mongodb/MongoDbRequestRepositoryAdapter');

class RequestRepositoryFactory {
  static create(type, logger) {
    switch (type) {
      case InMemory:
        return new InMemoryRequestRepository();
      case MongoDB:
        return new MongoDBRequestRepository(logger);
      default:
        throw new Error('Invalid peristence type');
    }
  }
}

module.exports = RequestRepositoryFactory;
