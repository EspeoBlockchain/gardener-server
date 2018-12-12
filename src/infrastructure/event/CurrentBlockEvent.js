class CurrentBlockEvent {
  static name() {
    return 'CurrentBlockEvent';
  }

  constructor(blockNumber) {
    this.blockNumber = blockNumber;
  }
}

module.exports = CurrentBlockEvent;
