/* eslint-disable */

require('dotenv').load();
const _ = require('lodash');
const EventBus = require('./infrastructure/event/EventBus');
const web3 = require('./infrastructure/blockchain/ethereum/createAndUnlockWeb3');
const oracleAbi = require('./config/abi/oracle.abi');

const CreateRequestEvent = require('./infrastructure/event/CreateRequestEvent');
const CreateRequestEventHandler = require('./infrastructure/event/CreateRequestEventHandler');
const CurrentBlockEventHandler = require('./infrastructure/event/CurrentBlockEventHandler');

const MarkValidRequestsAsReadyScheduler = require('./infrastructure/scheduling/MarkValidRequestsAsReadyScheduler');
const ExecuteReadyRequestsScheduler = require('./infrastructure/scheduling/ExecuteReadyRequestsScheduler');

const Logger = require('./adapter/ConsoleLoggerAdapter');
const RequestRepository = require('./adapter/InMemoryRequestRepositoryAdapter');
const ResponseRepository = require('./adapter/InMemoryResponseRepositoryAdapter');
const Oracle = require('./infrastructure/blockchain/ethereum/EthereumOracleAdapter');
const Blockchain = require('./infrastructure/blockchain/ethereum/EthereumBlockchainAdapter');
const DataClient = require('./adapter/AxiosDataClientAdapter');
const JsonSelector = require('./adapter/JsonSelectorAdapter');
const XmlSelector = require('./adapter/XmlSelectorAdapter');
const IdentitySelector = require('./adapter/IdentitySelectorAdapter');

const DataSelectorFinder = require('./domain/common/DataSelectorFinder');
const CreateRequestUseCase = require('./domain/request/usecase/CreateRequestUseCase');
const FetchNewOracleRequestsUseCase = require('./domain/blockchain/usecase/FetchNewOracleRequestsUseCase');
const MarkValidRequestsAsReadyUseCase = require('./domain/request/usecase/MarkValidRequestsAsReadyUseCase');
const FetchDataUseCase = require('./domain/common/usecase/FetchDataUseCase');
const SelectDataUseCase = require('./domain/common/usecase/SelectDataUseCase');
const ExecuteReadyRequestsUseCase = require('./domain/request/usecase/ExecuteReadyRequestsUseCase');

const BlockListener = require('./infrastructure/blockchain/BlockListener');

const logger = new Logger();
const requestRepository = new RequestRepository();
const responseRepository = new ResponseRepository();
const oracle = new Oracle(web3, oracleAbi, process.env.ORACLE_ADDRESS);
const dataClient = new DataClient();
const jsonSelector = new JsonSelector();
const xmlSelector = new XmlSelector();
const identitySelector = new IdentitySelector();
const dataSelectorFinder = new DataSelectorFinder([jsonSelector, xmlSelector, identitySelector]);



const createRequestUseCase = new CreateRequestUseCase(requestRepository, logger);
const fetchNewOracleRequestsUseCase = new FetchNewOracleRequestsUseCase(oracle, logger);
const markValidRequestsAsReadyUseCase = new MarkValidRequestsAsReadyUseCase(requestRepository);
const fetchDataUseCase = new FetchDataUseCase(dataClient, logger);
const selectDataUseCase = new SelectDataUseCase(dataSelectorFinder, responseRepository, logger);
const executeReadyRequestsUseCase = new ExecuteReadyRequestsUseCase(fetchDataUseCase, selectDataUseCase, requestRepository, responseRepository, logger);

const eventBus = new EventBus();

const createRequestEventHandler = new CreateRequestEventHandler(createRequestUseCase, eventBus);
const currentBlockEventHandler = new CurrentBlockEventHandler(fetchNewOracleRequestsUseCase, eventBus);

const markValidRequestsAsReadyScheduler = new MarkValidRequestsAsReadyScheduler(markValidRequestsAsReadyUseCase);
markValidRequestsAsReadyScheduler.schedule();
const executeReadyRequestsScheduler = new ExecuteReadyRequestsScheduler(executeReadyRequestsUseCase);
executeReadyRequestsScheduler.schedule();

const blockchain = new Blockchain(web3);
const blockListener = new BlockListener(eventBus, blockchain, logger);
blockListener.listen();

// const event1 = new CreateRequestEvent('id1', 'url1', Date.now());
// const event2 = new CreateRequestEvent('id2', 'url2', Date.now() - 1000);
// const event3 = new CreateRequestEvent('id3', 'url3', Date.now() + 1000000);
//
// setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event1), 1000);
// setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event2), 2000);
// setTimeout(() => eventBus.emit(CreateRequestEvent.name(), event3), 3000);

setTimeout(() => {
  console.log(Array.from(requestRepository.requests.values()).map(r => _.pick(r, ['id', 'state'])));
  console.log(Array.from(responseRepository.responses.values()).map(r => _.pick(r, ['requestId', 'state'])));
  process.exit(1);
}, 15000);
