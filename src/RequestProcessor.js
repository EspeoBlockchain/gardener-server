/* eslint-disable no-underscore-dangle */
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

        const request = Object.assign({}, event.returnValues, { startedAt: Date.now() });

        this.requestDao.saveRequest(request);
      })
      .on('error', logger.error);

    this.oracleContract.events.DelayedDataRequested()
      .on('data', async (event) => {
        logger.info(event);

        const request = Object.assign({}, event.returnValues, { startedAt: Date.now() });
        request.validFrom *= 1000;
        this.requestDao.saveRequest(request);
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
        if (!request) {
          guard = false;
          return;
        }
        requestedData = await processRequest(request.url);
      } catch (e) {
        errorCode = getErrorCode(e);
      }

      await this.requestDao.tagRequestAsFinished(request._id);
      logger.info(`Sending answer for request ${request._id}: (value: ${requestedData}, error: ${errorCode})`);

      const method = this.oracleContract.methods.fillRequest(
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
