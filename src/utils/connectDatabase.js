require('./loadEnv');
const Database = require('./Database');


const connectDatabase = async () => {
  const database = new Database(process.env.DATABASE_URL, process.env.DATABASE_NAME);
  database.connect();

  return database;
};

module.exports = connectDatabase;
