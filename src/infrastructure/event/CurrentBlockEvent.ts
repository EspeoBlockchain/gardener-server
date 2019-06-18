class CurrentBlockEvent {
  // @ts-ignore
  static name() {
    return 'CurrentBlockEvent';
  }

  constructor(public blockNumber) {}
}

export default CurrentBlockEvent;
