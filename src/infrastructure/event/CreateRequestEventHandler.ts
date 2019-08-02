import CreateRequestUseCase from '@core/domain/request/usecase/CreateRequestUseCase';
import {EventBus} from '@core/infrastructure/event/index';

import CreateRequestEvent from './CreateRequestEvent';

class CreateRequestEventHandler {
  useCase: CreateRequestUseCase;
  constructor(createRequestUseCase: CreateRequestUseCase, eventBus: EventBus) {
    this.useCase = createRequestUseCase;
    eventBus.on(CreateRequestEvent.name(), this.handleEvent.bind(this));
  }

  private handleEvent({ id, url, validFrom }: { id: string, url: string, validFrom: number | Date }) {
    this.useCase.createRequest(id, url, validFrom);
  }
}

export default CreateRequestEventHandler;
