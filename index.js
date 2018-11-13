require('dotenv').load();
require('./src/utils/statusPage');
const RequestProcessor = require('./src/RequestProcessor');

const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
requestProcessor.listen();
