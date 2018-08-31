/* eslint no-console: 0 */
const Web3 = require('web3');
const config = require('config');
require('dotenv').config();

const localProviderUrl = 'http://127.0.0.1:8545';
const localProvider = new Web3.providers.WebsocketProvider(localProviderUrl);
const web3 = new Web3(localProvider);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);


const oracleContract = new web3.eth.Contract(config.get('contracts.oracle.abi'), process.env.ORACLE_ADDRESS);

oracleContract.events.DataRequested()
  .on('data', (event) => {
    console.log(event);

    oracleContract.methods.fillRequest(event.returnValues.id, '1').send({
      from: process.env.PUBLIC_KEY,
      gas: 200000,
    }).then(console.log);
  })
  .on('error', console.error);
