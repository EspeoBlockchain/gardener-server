const mongoose = require('mongoose');
const { MongoDB } = require('./PersistenceType');

class PersistenceConnectionInitializer {
  init(type, options) {
    // eslint-disable-next-line default-case
    switch (type) {
      case MongoDB:
        this._initMongo(options);
        break;
    }
  }

  _initMongo({ databaseUrl, databaseName }) {
    mongoose.connect(`mongodb://${databaseUrl}/${databaseName}`, { useNewUrlParser: true });
  }
}

module.exports = PersistenceConnectionInitializer;
