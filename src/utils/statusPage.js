/* eslint no-console: 0 */
const express = require('express');
const config = require('config');

const app = express();
const port = config.get('port');


const okResponse = {
  status: 'alive',
};

app.get('/status', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(okResponse);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
