import { BlockchainPort } from '@core/domain/blockchain/port';
import * as Web3 from 'web3';

class EthereumBlockchainAdapter implements BlockchainPort {
  constructor(private readonly web3: Web3) {}

  getBlockNumber(): Promise<number> {
    return this.web3.eth.getBlockNumber();
  }
}

export default EthereumBlockchainAdapter;
