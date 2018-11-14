const config = require('config');
const web3 = require('./utils/createAndUnlockWeb3');
const getErrorCode = require('./utils/getErrorCode');
const { processRequest } = require('./request');
const logger = require('../src/config/winston');


class RequestProcessor {
  constructor(oracleAddress) {
    this.oracleContract = new web3.eth.Contract(
      config.get('contracts.oracle.abi'),
      oracleAddress,
    );
  }

  listen() {
    this.oracleContract.events.DataRequested()
      .on('data', async (event) => {
        logger.info(event);

        let selectedData;
        let errorCode;

        try {
          selectedData = await processRequest(event.returnValues.url);
        } catch (e) {
          errorCode = getErrorCode(e);
        }

        const method = this.oracleContract.methods.fillRequest(
          event.returnValues.id,
          selectedData || '',
          errorCode || 0,
        );
        const gas = await method.estimateGas({ from: web3.eth.defaultAccount });
        const result = await method.send({ from: web3.eth.defaultAccount, gas });
        logger.info(result);
      })
      .on('error', logger.error);
  }
}

module.exports = RequestProcessor;
