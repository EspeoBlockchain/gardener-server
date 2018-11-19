require('dotenv').load();
require('./src/utils/statusPage');
const connectDatabase = require('./src/utils/connectDatabase');
const RequestProcessor = require('./src/RequestProcessor');

connectDatabase();

const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
requestProcessor.listen();
requestProcessor.execute();
