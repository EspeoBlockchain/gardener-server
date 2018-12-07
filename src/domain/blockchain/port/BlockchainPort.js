/* eslint-disable class-methods-use-this */

class BlockchainPort {
  getBlockNumber() {
    throw new Error('Not implemented');
  }
}

module.exports = BlockchainPort;
