/* eslint-disable no-new */

require('dotenv').load();
const express = require('express');
const { EventBus } = require('./infrastructure/event');
const {
  web3,
  EthereumOracleAdapter: Oracle,
  EthereumBlockchainAdapter: Blockchain,
} = require('./infrastructure/blockchain/ethereum');
const oracleAbi = require('./config/abi/oracle.abi');
const { CreateRequestEventHandler, CurrentBlockEventHandler } = require('./infrastructure/event');
const { MarkValidRequestsAsReadyScheduler, ExecuteReadyRequestsScheduler } = require('./infrastructure/scheduling');
const {
  ConsoleLoggerAdapter: Logger,
  AxiosUrlDataFetcherAdapter: UrlDataFetcher,
} = require('./adapter');

const {
  JsonSelectorAdapter: JsonSelector,
  XmlSelectorAdapter: XmlSelector,
  IdentitySelectorAdapter: IdentitySelector,
} = require('./infrastructure/selectors');

const {
  CreateRequestUseCase,
  MarkValidRequestsAsReadyUseCase,
  ExecuteReadyRequestsUseCase,
} = require('./domain/request/usecase');

const {
  FetchDataUseCase,
  SelectDataUseCase,
  CheckHealthStatusUseCase,
} = require('./domain/common/usecase');

const {
  FetchNewOracleRequestsUseCase,
  SendResponseToOracleUseCase,
} = require('./domain/blockchain/usecase');

const DataSelectorFinder = require('./domain/common/DataSelectorFinder');

const BlockListener = require('./infrastructure/blockchain/BlockListener');

const { RequestRepositoryFactory, ResponseRepositoryFactory } = require('./infrastructure/persistence');
const PersistenceConnectionInitializer = require('./infrastructure/persistence/PersistenceConnectionInitializer');

const {
  DATABASE_URL, DATABASE_NAME, PERSISTENCE, START_BLOCK, SAFE_BLOCK_DELAY, API_PORT,
} = process.env;

const persistenceOptions = {
  databaseUrl: DATABASE_URL,
  databaseName: DATABASE_NAME,
};

new PersistenceConnectionInitializer().init(PERSISTENCE, persistenceOptions);

const logger = new Logger();
const requestRepository = RequestRepositoryFactory.create(PERSISTENCE, logger);
const responseRepository = ResponseRepositoryFactory.create(PERSISTENCE, logger);
const oracle = new Oracle(web3, oracleAbi, process.env.ORACLE_ADDRESS);
const urlDataFetcher = new UrlDataFetcher();
const jsonSelector = new JsonSelector();
const xmlSelector = new XmlSelector();
const identitySelector = new IdentitySelector();
const dataSelectorFinder = new DataSelectorFinder([jsonSelector, xmlSelector, identitySelector]);


const createRequestUseCase = new CreateRequestUseCase(requestRepository, logger);
const fetchNewOracleRequestsUseCase = new FetchNewOracleRequestsUseCase(
  oracle,
  logger,
  START_BLOCK,
);
const markValidRequestsAsReadyUseCase = new MarkValidRequestsAsReadyUseCase(
  requestRepository,
  logger,
);
const fetchDataUseCase = new FetchDataUseCase(urlDataFetcher, logger);
const selectDataUseCase = new SelectDataUseCase(dataSelectorFinder, logger);
const sendResponseToOracleUseCase = new SendResponseToOracleUseCase(oracle, logger);
const executeReadyRequestsUseCase = new ExecuteReadyRequestsUseCase(
  fetchDataUseCase,
  selectDataUseCase,
  sendResponseToOracleUseCase,
  requestRepository,
  responseRepository,
  logger,
);
const checkHealthStatusUseCase = new CheckHealthStatusUseCase();

const eventBus = new EventBus();

new CreateRequestEventHandler(createRequestUseCase, eventBus);
new CurrentBlockEventHandler(fetchNewOracleRequestsUseCase, eventBus);

const markValidRequestsAsReadyScheduler = new MarkValidRequestsAsReadyScheduler(
  markValidRequestsAsReadyUseCase,
);
markValidRequestsAsReadyScheduler.schedule();
const executeReadyRequestsScheduler = new ExecuteReadyRequestsScheduler(
  executeReadyRequestsUseCase,
);
executeReadyRequestsScheduler.schedule();

const blockchain = new Blockchain(web3);
const blockListener = new BlockListener(eventBus, blockchain, logger, SAFE_BLOCK_DELAY);
blockListener.listen();

const app = express();
const port = API_PORT;
require('./infrastructure/systemHealth/statusEndpoint')(app, checkHealthStatusUseCase);

app.listen(port);
