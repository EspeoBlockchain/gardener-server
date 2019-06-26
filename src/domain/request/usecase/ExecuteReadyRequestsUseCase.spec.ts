import SilentLogger from '@core/application/logger/SilentLoggerAdapter';
import InMemoryResponseRepositoryAdapter from '@core/infrastructure/persistence/inmemory/InMemoryResponseRepositoryAdapter';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import SendResponseToOracleUseCase from '../../blockchain/usecase/SendResponseToOracleUseCase';
import FetchDataUseCase from '../../common/usecase/FetchDataUseCase';
import SelectDataUseCase from '../../common/usecase/SelectDataUseCase';
import InvalidUrlError from '../../common/utils/error/InvalidUrlError';
import {RequestRepositoryPort} from '../port';
import Request from '../Request';
import ExecuteReadyRequestsUseCase from './ExecuteReadyRequestsUseCase';

describe('ExecuteReadyRequestsUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const requestRepository = () => {
    const requests = [];

    return {
      getReadyRequests: () => [new Request('123', 'json(http://example.com).key1', Date.now() - oneMinuteMillis)],
      list: () => requests,
      save: request => requests.push(request),
    };
  };

  const fetchDataUseCase = () => ({
    fetchData: () => Promise.resolve('fetchedData'),
  });

  const failedFetchDataUseCase = () => ({
    fetchData: () => Promise.reject(new InvalidUrlError('message')),
  });

  const selectDataUseCase = () => ({
    selectFromRawData: () => Promise.resolve('selectedData'),
  });

  const failedSelectDataUseCase = () => ({
    selectFromRawData: () => Promise.reject(new Error()),
  });

  const sendResponseToOracleUseCase = () => ({
    sendResponse: () => Promise.resolve(),
  });

  const failedSendResponseToOracleUseCase = () => ({
    sendResponse: () => Promise.reject(new Error()),
  });

  it('should execute ready request which is finished after that and generate response', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase() as unknown as FetchDataUseCase,
      selectDataUseCase() as unknown as SelectDataUseCase,
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('123');
    expect(response.requestId).to.equal('123');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark request as failed if error does not have code property', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const reqRepository = requestRepository();
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase() as unknown as FetchDataUseCase,
      failedSelectDataUseCase() as unknown as SelectDataUseCase,
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      reqRepository as unknown as RequestRepositoryPort,
      responseRepository,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    expect(reqRepository.list()[0].state.name).to.equal('Failed');
  });

  it('should create response with errorCode if error with code property handled', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const sut = new ExecuteReadyRequestsUseCase(
      failedFetchDataUseCase() as unknown as FetchDataUseCase,
      selectDataUseCase() as unknown as SelectDataUseCase,
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('123');
    expect(response.requestId).to.equal('123');
    expect(response.selectedData).to.equal(undefined);
    expect(response.errorCode).to.equal(1000);
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark response as failed if it failed to send to oracle', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase() as unknown as FetchDataUseCase,
      selectDataUseCase() as unknown as SelectDataUseCase,
      failedSendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('123');
    expect(response.requestId).to.equal('123');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Failed');
  });
});
