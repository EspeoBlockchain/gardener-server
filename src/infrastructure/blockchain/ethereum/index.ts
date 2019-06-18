const web3 = require('./createAndUnlockWeb3');
const EthereumBlockchainAdapter = require('./EthereumBlockchainAdapter');
const EthereumOracleAdapter = require('./EthereumOracleAdapter');

module.exports = {
  web3,
  EthereumBlockchainAdapter,
  EthereumOracleAdapter,
};
