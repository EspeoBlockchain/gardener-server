import CreateRequestUseCase from '@core/domain/request/usecase/CreateRequestUseCase';
import {EventBus} from '@core/infrastructure/event/index';

import CreateRequestEvent from './CreateRequestEvent';

class CreateRequestEventHandler {
  useCase: CreateRequestUseCase;
  constructor(createRequestUseCase: CreateRequestUseCase, eventBus: EventBus) {
    this.useCase = createRequestUseCase;
    eventBus.on(CreateRequestEvent.name(), this._handleEvent.bind(this));
  }

  _handleEvent({ id, url, validFrom }: { id: string, url: string, validFrom: number }) {
    this.useCase.createRequest(id, url, validFrom);
  }
}

export default CreateRequestEventHandler;
