/* eslint-disable */

require('dotenv').load();
const EventBus = require('./infrastructure/event/EventBus');
const web3 = require('./infrastructure/blockchain/createAndUnlockWeb3');
const oracleAbi = require('./config/abi/oracle.abi');

const CreateRequestEvent = require('./infrastructure/event/CreateRequestEvent');
const CreateRequestEventHandler = require('./infrastructure/event/CreateRequestEventHandler');
const CurrentBlockEventHandler = require('./infrastructure/event/CurrentBlockEventHandler');

const Logger = require('./adapter/ConsoleLoggerAdapter');
const RequestRepository = require('./adapter/InMemoryRequestRepositoryAdapter');
const Oracle = require('./infrastructure/blockchain/ethereum/EthereumOracleAdapter');
const Blockchain = require('./infrastructure/blockchain/ethereum/EthereumBlockchainAdapter');

const CreateRequestUseCase = require('./domain/request/usecase/CreateRequestUseCase');
const FetchNewOracleRequestsUseCase = require('./domain/blockchain/usecase/FetchNewOracleRequestsUseCase');

const BlockListener = require('./infrastructure/blockchain/BlockListener');

const logger = new Logger();
const requestRepository = new RequestRepository();
const oracle = new Oracle(web3, oracleAbi, process.env.ORACLE_ADDRESS);
const createRequestUseCase = new CreateRequestUseCase(requestRepository, logger);
const fetchNewOracleRequestsUseCase = new FetchNewOracleRequestsUseCase(oracle, logger);

const eventBus = new EventBus();

const createRequestEventHandler = new CreateRequestEventHandler(createRequestUseCase, eventBus);
const currentBlockEventHandler = new CurrentBlockEventHandler(fetchNewOracleRequestsUseCase, eventBus);

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
