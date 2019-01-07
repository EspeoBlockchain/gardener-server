const { InMemory, MongoDB } = require('./PersistanceTypesEnum');
const InMemoryResponseRepository = require('./inmemory/InMemoryResponseRepositoryAdapter');
const MongoDBResponseRepository = require('./mongodb/MongoDBResponseRepositoryAdapter');

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
