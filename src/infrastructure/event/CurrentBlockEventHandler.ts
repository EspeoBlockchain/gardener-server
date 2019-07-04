import { FetchNewOracleRequestsUseCase } from '@core/domain/blockchain/usecase';
import { EventBus } from '@core/infrastructure/event';

import CreateRequestEvent from './CreateRequestEvent';
import CurrentBlockEvent from './CurrentBlockEvent';

class CurrentBlockEventHandler {
  constructor(
    private readonly useCase: FetchNewOracleRequestsUseCase,
    private readonly eventBus: EventBus,
  ) {
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
