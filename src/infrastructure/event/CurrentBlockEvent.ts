class CurrentBlockEvent {
  static name() {
    return 'CurrentBlockEvent';
  }

  constructor(blockNumber) {
    this.blockNumber = blockNumber;
  }
}

export default CurrentBlockEvent;
