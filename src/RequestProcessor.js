/* eslint no-console: 0 */
const config = require('config');
const web3 = require('./utils/createAndUnlockWeb3');
const getErrorCode = require('./utils/getErrorCode');
const { processRequest } = require('./request');


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
        console.log(event);

        let selectedData;
        let errorCode;

        try {
          selectedData = await processRequest(event.returnValues.url);
          if (!selectedData) {
            errorCode = 404;
          }
        } catch (e) {
          errorCode = getErrorCode(e);
        }

        this.oracleContract.methods.fillRequest(
          event.returnValues.id,
          selectedData || '',
          errorCode || 0,
        ).send({
          from: web3.eth.defaultAccount,
          gas: 200000,
        }).then(console.log);
      })
      .on('error', console.error);
  }
}

module.exports = RequestProcessor;
