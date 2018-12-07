/* eslint-disable */

require('dotenv').load();
const _ = require('lodash');
const express = require('express');

const EventBus = require('./infrastructure/event/EventBus');
const web3 = require('./infrastructure/blockchain/ethereum/createAndUnlockWeb3');
const oracleAbi = require('./config/abi/oracle.abi');

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
const SendResponseToOracleUseCase = require('./domain/blockchain/usecase/SendResponseToOracleUseCase');
const ExecuteReadyRequestsUseCase = require('./domain/request/usecase/ExecuteReadyRequestsUseCase');
const CheckHealthStatusUseCase = require('./domain/common/usecase/CheckHealthStatusUseCase');

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
const selectDataUseCase = new SelectDataUseCase(dataSelectorFinder, logger);
const sendResponseToOracleUseCase = new SendResponseToOracleUseCase(oracle, logger);
const executeReadyRequestsUseCase = new ExecuteReadyRequestsUseCase(fetchDataUseCase, selectDataUseCase, sendResponseToOracleUseCase, requestRepository, responseRepository, logger);
const checkHealthStatusUseCase = new CheckHealthStatusUseCase();

const eventBus = new EventBus();

new CreateRequestEventHandler(createRequestUseCase, eventBus);
new CurrentBlockEventHandler(fetchNewOracleRequestsUseCase, eventBus);

const markValidRequestsAsReadyScheduler = new MarkValidRequestsAsReadyScheduler(markValidRequestsAsReadyUseCase);
markValidRequestsAsReadyScheduler.schedule();
const executeReadyRequestsScheduler = new ExecuteReadyRequestsScheduler(executeReadyRequestsUseCase);
executeReadyRequestsScheduler.schedule();

const blockchain = new Blockchain(web3);
const blockListener = new BlockListener(eventBus, blockchain, logger, process.env.SAFE_BLOCK_DELAY);
blockListener.listen();

const app = express();
const port = process.env.API_PORT;
require('./infrastructure/systemHealth/statusEndpoint')(app, checkHealthStatusUseCase);
app.listen(port);

