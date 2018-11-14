require('dotenv').load();
require('./src/utils/statusPage');
const Database = require('./src/utils/Database');
const RequestProcessor = require('./src/RequestProcessor');

const database = new Database(process.env.DATABASE_URL, process.env.DATABASE_NAME);
database.connect();

const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
requestProcessor.listen();
