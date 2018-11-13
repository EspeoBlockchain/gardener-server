const mongoose = require('mongoose');

class Database {
  constructor(server, database) {
    this.server = server;
    this.database = database;
  }

  connect() {
    mongoose.connect(`mongodb://${this.server}/${this.database}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error(`Database connection error: ${err}`);
      });
  }
}

module.exports = Database;
