const { InMemory, MongoDB } = require('./PersistanceTypesEnum');
const InMemoryRequestRepository = require('./inmemory/InMemoryRequestRepositoryAdapter');
const MongoDBRequestRepository = require('./mongodb/MongoDBRequestRepositoryAdapter');

class RequestRepositoryFactory {
  static create(type, logger) {
    switch (type) {
      case InMemory:
        return new InMemoryRequestRepository();
      case MongoDB:
        return new MongoDBRequestRepository(logger);
      default:
        throw new Error('Invalid peristance type');
    }
  }
}

module.exports = RequestRepositoryFactory;
