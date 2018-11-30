/* eslint-disable no-underscore-dangle */
const scheduler = require('node-schedule');
const _ = require('lodash');
const web3 = require('./utils/createAndUnlockWeb3');
const getErrorCode = require('./utils/getErrorCode');
const { processRequest } = require('./request');
const logger = require('../src/config/winston');
const RequestDao = require('./model/RequestDao');
const DataDao = require('./model/DataDao');
const oracleAbi = require('./config/abi/oracle.abi');


class RequestProcessor {
  constructor(oracleAddress, blockEmitter) {
    this.oracleContract = new web3.eth.Contract(
      oracleAbi,
      oracleAddress,
    );
    this.requestDao = new RequestDao();
    this.dataDao = new DataDao();
    this.blockEmitter = blockEmitter;
  }

  listen() {
    this.blockEmitter.on('actualBlock', (blockNumber) => {
      const startBlock = this.lastProcessedBlock
        ? this.lastProcessedBlock + 1
        : blockNumber - process.env.BLOCKS_TO_LOAD_AT_START;

      this.processEvents(startBlock, blockNumber);

      this.lastProcessedBlock = blockNumber;
    });
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
        await this.dataDao.saveData(request._id, requestedData);
      } catch (e) {
        errorCode = getErrorCode(e);
      }

      await this.requestDao.tagRequestAsFinished(request._id);
      logger.info(`Sending answer for request ${request._id}: (value: ${_.get(requestedData, 'selectedData', '')}, error: ${errorCode})`);

      const method = this.oracleContract.methods.fillRequest(
        request._id,
        _.get(requestedData, 'selectedData', ''),
        errorCode || 0,
      );
      const gas = await method.estimateGas({ from: web3.eth.defaultAccount });
      const result = await method.send({ from: web3.eth.defaultAccount, gas });
      logger.info(JSON.stringify(result));

      guard = false;
    });
  }

  processEvents(fromBlock, toBlock) {
    logger.info(`Start processing events from blocks ${fromBlock}-${toBlock}`);

    this.oracleContract.getPastEvents(
      'DataRequested',
      { fromBlock, toBlock },
    ).then(events => events.forEach((event) => {
      logger.info(`DataRequested event: ${JSON.stringify(event)}`);

      const request = Object.assign({}, event.returnValues, { startedAt: Date.now() });

      this.requestDao.saveRequest(request);
    }));

    this.oracleContract.getPastEvents(
      'DelayedDataRequested',
      { fromBlock, toBlock },
    ).then(events => events.forEach((event) => {
      logger.info(`DelayedDataRequested event: ${JSON.stringify(event)}`);

      const request = Object.assign({}, event.returnValues, { startedAt: Date.now() });
      request.validFrom *= 1000;
      this.requestDao.saveRequest(request);
    }));
  }
}

module.exports = RequestProcessor;
