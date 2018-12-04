class State {
  _checkState(predicate) {
    if (!predicate(this.name)) {
      // FIXME more user friendly error message
      throw new Error('Illegal state machine transition');
    }
  }
}

module.exports = State;
