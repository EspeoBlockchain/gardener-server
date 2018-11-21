require('dotenv').load();
const server = require('./src/utils/statusPage');
const connectDatabase = require('./src/utils/connectDatabase');
const RequestProcessor = require('./src/RequestProcessor');
const logger = require('./src/config/winston');

const runProcessing = async () => {
  const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
  await requestProcessor.listen();
  requestProcessor.execute();
};

const db = connectDatabase();
runProcessing();


process.on('exit', async () => {
  logger.error('server is about to exit');
  server.close();
  await db.disconnect();
});
