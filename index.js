require('dotenv').load();
const server = require('./src/utils/statusPage');
const connectDatabase = require('./src/utils/connectDatabase');
const RequestProcessor = require('./src/RequestProcessor');
const ActualBlockEmitter = require('./src/ActualBlockEmitter');
const logger = require('./src/config/winston');

const db = connectDatabase();
const blockEmitter = new ActualBlockEmitter();
blockEmitter.listen();
const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS, blockEmitter);
requestProcessor.listen();
requestProcessor.execute();


process.on('exit', async () => {
  logger.error('server is about to exit');
  server.close();
  await db.disconnect();
});
