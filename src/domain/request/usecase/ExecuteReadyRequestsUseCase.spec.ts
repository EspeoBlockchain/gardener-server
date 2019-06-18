import { describe, it } from 'mocha';
import { expect } from 'chai';
import ExecuteReadyRequestsUseCase from './ExecuteReadyRequestsUseCase';
import Request from '../Request';
import { Logger } from '../../common/utils/TestMocks';
import InvalidUrlError from '../../common/utils/error/InvalidUrlError';

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

  const responseRepository = () => {
    const responses = [];
    return {
      save: res => responses.push(res),
      list: () => responses,
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
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      selectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      new Logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await sut.responseRepository.list()[0];
    expect(response.requestId).to.equal('123');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Sent');
    expect(sut.logger.list()).to.have.lengthOf(4);
  });

  it('should mark request as failed if error does not have code property', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      failedSelectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      new Logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    expect(sut.requestRepository.list()[0].state.name).to.equal('Failed');
  });

  it('should create response with errorCode if error with code property handled', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      failedFetchDataUseCase(),
      selectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      new Logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await sut.responseRepository.list()[0];
    expect(response.requestId).to.equal('123');
    expect(response.selectedData).to.equal(undefined);
    expect(response.errorCode).to.equal(1000);
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark response as failed if it failed to send to oracle', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      selectDataUseCase(),
      failedSendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      new Logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await sut.responseRepository.list()[0];
    expect(response.requestId).to.equal('123');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Failed');
  });
});
