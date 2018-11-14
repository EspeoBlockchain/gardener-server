const config = require('config');
const scheduler = require('node-schedule');
const web3 = require('./utils/createAndUnlockWeb3');
const getErrorCode = require('./utils/getErrorCode');
const { processRequest } = require('./request');
const logger = require('../src/config/winston');
const RequestDao = require('./model/RequestDao');


class RequestProcessor {
  constructor(oracleAddress) {
    this.oracleContract = new web3.eth.Contract(
      config.get('contracts.oracle.abi'),
      oracleAddress,
    );
    this.requestDao = new RequestDao();
  }

  listen() {
    this.oracleContract.events.DataRequested()
      .on('data', async (event) => {
        logger.info(event);

        this.requestDao.saveRequest(event.returnValues.url);
      })
      .on('error', logger.error);
  }

  execute() {
    let guard = false;
    scheduler.scheduleJob('* * * * * *', async () => {
      if (guard) return;
      guard = true;

      let request;
      let requestedData;
      let errorCode;

      try {
        request = await this.requestDao.findSingleRequestReadyToExecute(new Date());
        if (!request) return;
        requestedData = await processRequest(request.url);
      } catch (e) {
        errorCode = getErrorCode(e);
      }

      const method = this.oracleContract.methods.fillRequest(
        // eslint-disable-next-line no-underscore-dangle
        request._id,
        requestedData || '',
        errorCode || 0,
      );
      const gas = await method.estimateGas({ from: web3.eth.defaultAccount });
      const result = await method.send({ from: web3.eth.defaultAccount, gas });
      logger.info(result);

      guard = false;
    });
  }
}

module.exports = RequestProcessor;
