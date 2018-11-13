const express = require('express');
const config = require('config');
const logger = require('../../src/config/winston');

const app = express();
const port = config.get('port');


const okResponse = {
  status: 'alive',
};

app.get('/status', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(okResponse);
});

app.listen(port, () => logger.info(`Example app listening on port ${port}!`));
