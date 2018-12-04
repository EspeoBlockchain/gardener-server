const web3 = require('./createAndUnlockWeb3');

const BlockchainPort = require('./BlockchainPort');

class EthereumBlockchainAdapter extends BlockchainPort {
  getBlockNumber() {
    return web3.eth.getBlockNumber();
  }
}

module.exports = EthereumBlockchainAdapter;
