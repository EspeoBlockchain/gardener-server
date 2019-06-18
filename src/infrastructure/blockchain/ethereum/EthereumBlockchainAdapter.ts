import BlockchainPort from '../../../domain/blockchain/port/BlockchainPort';

class EthereumBlockchainAdapter extends BlockchainPort {
  web3: any;
  constructor(web3) {
    super();
    this.web3 = web3;
  }

  getBlockNumber() {
    return this.web3.eth.getBlockNumber();
  }
}

export default EthereumBlockchainAdapter;
