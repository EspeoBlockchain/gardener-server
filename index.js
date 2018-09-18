require('dotenv').load();
const RequestProcessor = require('./src/RequestProcessor');

const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
requestProcessor.listen();
