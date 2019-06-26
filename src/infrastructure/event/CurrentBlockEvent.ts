class CurrentBlockEvent {
  // @ts-ignore
  static name() {
    return 'CurrentBlockEvent';
  }

  constructor(public blockNumber: number) {}
}

export default CurrentBlockEvent;
