const EventEmitter = require('events');
const web3 = require('./utils/createAndUnlockWeb3');
const logger = require('../src/config/winston');


class ActualBlockEmitter extends EventEmitter {
  constructor() {
    super();
    this.lastBlock = 0;
  }

  listen() {
    setInterval(this.checkForNewBlock.bind(this), 5000);
  }

  async checkForNewBlock() {
    const blockNumber = await web3.eth.getBlockNumber();
    if (blockNumber > this.lastBlock) {
      this.lastBlock = blockNumber;
      logger.info(`Updated actual block: ${blockNumber}`);
      this.emit('actualBlock', blockNumber);
    }
  }
}

module.exports = ActualBlockEmitter;
