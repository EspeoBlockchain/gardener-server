const Web3 = require('web3');

const localProvider = new Web3.providers.WebsocketProvider(process.env.NODE_URL);
const web3 = new Web3(localProvider);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
web3.eth.defaultAccount = process.env.PUBLIC_KEY;

module.exports = web3;
