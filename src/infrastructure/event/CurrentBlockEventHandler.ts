import CurrentBlockEvent from './CurrentBlockEvent';
import CreateRequestEvent from './CreateRequestEvent';

class CurrentBlockEventHandler {
  constructor(fetchNewOracleRequestsUseCase, eventBus) {
    this.useCase = fetchNewOracleRequestsUseCase;
    this.eventBus = eventBus;

    // TODO guard from race condition:
    // new block before previous event is handled
    this.eventBus.on(CurrentBlockEvent.name(), this._handleEvent.bind(this));
  }

  async _handleEvent({ blockNumber }) {
    const requests = await this.useCase.fetchNewRequests(blockNumber);
    requests
      .map(({ id, url, validFrom }) => new CreateRequestEvent(id, url, validFrom))
      .forEach(event => this.eventBus.emit(CreateRequestEvent.name(), event));
  }
}

export default CurrentBlockEventHandler;
