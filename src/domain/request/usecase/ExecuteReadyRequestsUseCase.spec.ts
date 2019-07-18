import { expect } from 'chai';
import { describe, it } from 'mocha';

import SilentLogger from '../../../application/logger/SilentLoggerAdapter';
import InMemoryResponseRepositoryAdapter from '../../../infrastructure/persistence/inmemory/InMemoryResponseRepositoryAdapter';

import InvalidUrlError from '../../common/utils/error/InvalidUrlError';

import SendResponseToOracleUseCase from '../../blockchain/usecase/SendResponseToOracleUseCase';
import Response from '../../response/Response';

import {RequestRepositoryPort} from '../port';
import Request from '../Request';
import RequestExecutorFactory from '../requestExecutor/RequestExecutorFactory';
import ExecuteReadyRequestsUseCase from './ExecuteReadyRequestsUseCase';

describe('ExecuteReadyRequestsUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const requestRepository = () => {
    const requests = [];

    return {
      getReadyRequests: () => [new Request('SOME_REQUEST_ID', 'json(http://example.com).key1', Date.now() - oneMinuteMillis)],
      list: () => requests,
      save: request => requests.push(request),
    };
  };

  const requestExecutorFactory = () => {
    const executor = () => {
      const response = new Response('SOME_REQUEST_ID');
      response.addFetchedData('fetchedData');
      response.addSelectedData('selectedData');

      return {
        execute: () => Promise.resolve(response),
      };
    };

    return {
      create: () => executor(),
    };
  };

  const genericFailingRequestExecutorFactory = () => {
    const executor = () => ({
      execute: () => Promise.reject(new Error()),
    });

    return {
      create: () => executor(),
    };
  };

  const invalidUrlFailingRequestExecutorFactory = () => {
    const executor = () => ({
      execute: () => Promise.reject(new InvalidUrlError('message')),
    });

    return {
      create: () => executor(),
    };
  };

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
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      requestExecutorFactory() as unknown as RequestExecutorFactory,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('SOME_REQUEST_ID');
    expect(response.requestId).to.equal('SOME_REQUEST_ID');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark request as failed if error does not have code property', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const reqRepository = requestRepository();
    const sut = new ExecuteReadyRequestsUseCase(
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      reqRepository as unknown as RequestRepositoryPort,
      responseRepository,
      genericFailingRequestExecutorFactory() as unknown as RequestExecutorFactory,
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
      sendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      invalidUrlFailingRequestExecutorFactory() as unknown as RequestExecutorFactory,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('SOME_REQUEST_ID');
    expect(response.requestId).to.equal('SOME_REQUEST_ID');
    expect(response.selectedData).to.equal(undefined);
    expect(response.errorCode).to.equal(1000);
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark response as failed if it failed to send to oracle', async () => {
    // given
    const responseRepository = new InMemoryResponseRepositoryAdapter();
    const sut = new ExecuteReadyRequestsUseCase(
      failedSendResponseToOracleUseCase() as unknown as SendResponseToOracleUseCase,
      requestRepository() as unknown as RequestRepositoryPort,
      responseRepository,
      requestExecutorFactory() as unknown as RequestExecutorFactory,
      new SilentLogger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await responseRepository.get('SOME_REQUEST_ID');
    expect(response.requestId).to.equal('SOME_REQUEST_ID');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Failed');
  });
});
