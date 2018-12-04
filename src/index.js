const EventBus = require('./infrastructure/event/EventBus');

const CreateRequestEvent = require('./infrastructure/event/CreateRequestEvent');
const CreateRequestEventHandler = require('./infrastructure/event/CreateRequestEventHandler');

const Logger = require('./adapter/ConsoleLoggerAdapter');
const RequestRepository = require('./adapter/InMemoryRequestRepositoryAdapter');

const CreateRequestUseCase = require('./domain/request/usecase/CreateRequestUseCase');

const logger = new Logger();
const requestRepository = new RequestRepository();
const createRequestUseCase = new CreateRequestUseCase(requestRepository, logger);

const eventBus = new EventBus();

const createRequestEventHandler = new CreateRequestEventHandler(createRequestUseCase, eventBus);

const event1 = new CreateRequestEvent('id1', 'url1', Date.now());
const event2 = new CreateRequestEvent('id2', 'url2', Date.now() - 1000);
const event3 = new CreateRequestEvent('id3', 'url3', Date.now() + 1000000);

setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event1), 1000);
setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event2), 2000);
setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event3), 3000);