import CreateRequestEvent from './CreateRequestEvent';

class CreateRequestEventHandler {
  constructor(createRequestUseCase, eventBus) {
    this.useCase = createRequestUseCase;
    eventBus.on(CreateRequestEvent.name(), this._handleEvent.bind(this));
  }

  _handleEvent({ id, url, validFrom }) {
    this.useCase.createRequest(id, url, validFrom);
  }
}

export default CreateRequestEventHandler;
