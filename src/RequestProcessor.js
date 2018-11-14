const config = require('config');
const scheduler = require('node-schedule');
const web3 = require('./utils/createAndUnlockWeb3');
const getErrorCode = require('./utils/getErrorCode');
const { executeRequest } = require('./request');
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
    scheduler.scheduleJobn('* * * * * *', async (event) => {
      if (guard) return;
      guard = true;
      let request;
      let errorCode;

      let resolvedRequest;

      try {
        resolvedRequest = await executeRequest(new Date());
      } catch (e) {
        errorCode = getErrorCode(e);
      }

      const method = this.oracleContract.methods.fillRequest(
        event.returnValues.id,
        request || '',
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
