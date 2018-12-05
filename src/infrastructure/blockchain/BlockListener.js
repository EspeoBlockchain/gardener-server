const CurrentBlockEvent = require('../event/CurrentBlockEvent');

const CHECK_INTERVAL_MILLIS = 5000;

class BlockListener {
  constructor(eventBus, blockchain, logger) {
    this.eventBus = eventBus;
    this.blockchain = blockchain;
    this.logger = logger;
  }

  listen() {
    setInterval(this.pollBlockNumber.bind(this), CHECK_INTERVAL_MILLIS);
  }

  async pollBlockNumber() {
    const blockNumber = await this.blockchain.getBlockNumber();
    this.logger.info(`Block number: ${blockNumber}`);

    const event = new CurrentBlockEvent(blockNumber);
    this.eventBus.emit(CurrentBlockEvent.name(), event);
  }
}

module.exports = BlockListener;
