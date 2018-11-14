const mongoose = require('mongoose');
const logger = require('../../src/config/winston');

class Database {
  constructor(server, database) {
    this.server = server;
    this.database = database;
  }

  connect() {
    mongoose.connect(`mongodb://${this.server}/${this.database}`, { useNewUrlParser: true })
      .then(() => {
        logger.info('Database connection successful');
      })
      .catch((err) => {
        logger.error(`Database connection error: ${err}`);
      });
  }
}

module.exports = Database;
