/* eslint no-console: 0 */
const config = require('config');
const web3 = require('./utils/createAndUnlockWeb3');
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

        const selectedData = await processRequest(event.returnValues.url);
        const method = this.oracleContract.methods.fillRequest(event.returnValues.id, selectedData);
        const gas = await method.estimateGas({ from: web3.eth.defaultAccount });
        const result = await method.send({ from: web3.eth.defaultAccount, gas });
        console.log(result);
      })
      .on('error', console.error);
  }
}

module.exports = RequestProcessor;
