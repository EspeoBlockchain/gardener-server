const { InMemory, MongoDB } = require('./PersistenceType');
const InMemoryResponseRepository = require('./inmemory/InMemoryResponseRepositoryAdapter');
const MongoDBResponseRepository = require('./mongodb/MongoDbResponseRepositoryAdapter');

class ResponseRepositoryFactory {
  static create(type, logger) {
    switch (type) {
      case InMemory:
        return new InMemoryResponseRepository();
      case MongoDB:
        return new MongoDBResponseRepository(logger);
      default:
        throw new Error('Invalid peristance type');
    }
  }
}

module.exports = ResponseRepositoryFactory;
