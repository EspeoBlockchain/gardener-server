const mongoose = require('mongoose');
const logger = require('../../src/config/winston');

class Database {
  constructor(server, database) {
    this.server = server;
    this.database = database;
  }

  connect() {
    return mongoose.connect(`mongodb://${this.server}/${this.database}`, { useNewUrlParser: true, autoReconnect: false })
      .then(() => logger.info('Database connection successful'))
      .catch(err => logger.error(`Database connection error: ${err}`));
  }

  // eslint-disable-next-line class-methods-use-this
  disconnect() {
    return mongoose.disconnect()
      .then(() => logger.info('Database connection closed'))
      .catch(err => logger.error(`Error when closing connection to database: ${err}`));
  }
}

module.exports = Database;
