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

        this.oracleContract.methods.fillRequest(
          event.returnValues.id,
          selectedData,
        ).estimateGas({ from: web3.eth.defaultAccount }).then((gasAmount) => {
          this.send(event, selectedData, gasAmount);
        });
      })
      .on('error', console.error);
  }

  send(event, selectedData, gas) {
    this.oracleContract.methods.fillRequest(event.returnValues.id, selectedData).send({
      from: web3.eth.defaultAccount,
      gas,
    }).then(console.log);
  }
}

module.exports = RequestProcessor;
