require('dotenv').load();
require('./src/utils/statusPage');
const mongoose = require('mongoose');
const RequestProcessor = require('./src/RequestProcessor');

const requestProcessor = new RequestProcessor(process.env.ORACLE_ADDRESS);
requestProcessor.listen();

mongoose.connect('mongodb://mongo:27017/oracle-server',
  { useNewUrlParser: true })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err));

app