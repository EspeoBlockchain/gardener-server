import RequestExecutorStrategy from '@core/domain/request/requestExecutor/RequestExecutorStrategy';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import statusEndpoint from './infrastructure/systemHealth/statusEndpoint';

import {
  EthereumBlockchainAdapter as Blockchain,
  EthereumOracleAdapter as Oracle,
  web3,
} from './infrastructure/blockchain/ethereum';
import { EventBus } from './infrastructure/event';

import Logger from './application/logger/ConsoleLoggerAdapter';
import oracleAbi from './config/abi/oracle.abi';
import { CreateRequestEventHandler, CurrentBlockEventHandler } from './infrastructure/event';
import { ExecuteReadyRequestsScheduler, MarkValidRequestsAsReadyScheduler } from './infrastructure/scheduling';

import {
  IdentitySelectorAdapter as IdentitySelector,
  JsonSelectorAdapter as JsonSelector,
  XmlSelectorAdapter as XmlSelector,
} from './application/selector';

import {
  CreateRequestUseCase,
  ExecuteReadyRequestsUseCase,
  MarkValidRequestsAsReadyUseCase,
} from './domain/request/usecase';

import {
  CheckHealthStatusUseCase,
  SelectDataUseCase,
} from './domain/common/usecase';

import {
  FetchNewOracleRequestsUseCase,
  SendResponseToOracleUseCase,
} from './domain/blockchain/usecase';

import DataSelectorFinder from './domain/common/DataSelectorFinder';

import BlockListener from './infrastructure/blockchain/BlockListener';

import { AbiItem } from 'web3-utils/types';
import { RequestRepositoryFactory, ResponseRepositoryFactory } from './infrastructure/persistence';
import PersistenceConnectionInitializer from './infrastructure/persistence/PersistenceConnectionInitializer';

const {
  DATABASE_URL, DATABASE_NAME, PERSISTENCE, START_BLOCK, SAFE_BLOCK_DELAY, API_PORT,
  SGX_ENABLED, RANDOMDOTORG_API_KEY,
} = process.env;

const persistenceOptions = {
  databaseUrl: DATABASE_URL,
  databaseName: DATABASE_NAME,
};

new PersistenceConnectionInitializer().init(PERSISTENCE, persistenceOptions);

const logger = new Logger();
const requestRepository = RequestRepositoryFactory.create(PERSISTENCE, logger);
const responseRepository = ResponseRepositoryFactory.create(PERSISTENCE, logger);
const oracle = new Oracle(web3, oracleAbi as AbiItem[], process.env.ORACLE_ADDRESS);
const jsonSelector = new JsonSelector();
const xmlSelector = new XmlSelector();
const identitySelector = new IdentitySelector();
const dataSelectorFinder = new DataSelectorFinder([jsonSelector, xmlSelector, identitySelector]);

const createRequestUseCase = new CreateRequestUseCase(requestRepository, logger);
const fetchNewOracleRequestsUseCase = new FetchNewOracleRequestsUseCase(
  oracle,
  logger,
  parseInt(START_BLOCK, 10),
);
const markValidRequestsAsReadyUseCase = new MarkValidRequestsAsReadyUseCase(
  requestRepository,
  logger,
);
const selectDataUseCase = new SelectDataUseCase(dataSelectorFinder, logger);
const requestExecutorFactory = new RequestExecutorStrategy(
    SGX_ENABLED.toLowerCase() === 'true', RANDOMDOTORG_API_KEY, selectDataUseCase, logger,
);
const sendResponseToOracleUseCase = new SendResponseToOracleUseCase(oracle, logger);
const executeReadyRequestsUseCase = new ExecuteReadyRequestsUseCase(
  sendResponseToOracleUseCase,
  requestRepository,
  responseRepository,
  requestExecutorFactory,
  logger,
);
const checkHealthStatusUseCase = new CheckHealthStatusUseCase();

const eventBus = new EventBus();

// tslint:disable-next-line
new CreateRequestEventHandler(createRequestUseCase, eventBus);
// tslint:disable-next-line
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
statusEndpoint(app, checkHealthStatusUseCase);

app.listen(port);
