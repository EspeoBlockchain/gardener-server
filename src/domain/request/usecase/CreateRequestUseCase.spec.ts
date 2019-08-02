import SilentLogger from '@core/application/logger/SilentLoggerAdapter';
import { expect } from '@core/config/configuredChai';
import InMemoryRequestRepositoryAdapter from '@core/infrastructure/persistence/inmemory/InMemoryRequestRepositoryAdapter';
import { beforeEach, describe, it } from 'mocha';
import {RequestRepositoryPort} from '../port';
import CreateRequestUseCase from './CreateRequestUseCase';

describe('CreateRequestUseCase', () => {
  let sut: CreateRequestUseCase;
  let repository: RequestRepositoryPort;

  beforeEach(() => {
    repository = new InMemoryRequestRepositoryAdapter();
    sut = new CreateRequestUseCase(repository, new SilentLogger());
  });

  it('should save request in the repository', async () => {
    // given
    const id = '123';
    const url = 'qwerty';
    const validFrom = Date.now();
    // when
    await sut.createRequest(id, url, validFrom);
    // then
    const savedRequest = await repository.get(id);
    expect(savedRequest.id).to.equal(id);
    expect(savedRequest.url).to.equal(url);
    expect(savedRequest.validFrom).to.equal(validFrom);
  });

  it('should throw error if the same request is passed twice', async () => {
    // given
    const id = '123';
    const url = 'qwerty';
    const validFrom = Date.now();
    await sut.createRequest(id, url, validFrom);
    // when, then
    return expect(sut.createRequest(id, url, validFrom))
        .to.eventually.be.rejectedWith(`Request ${id} already in the system`)
        .and.be.an.instanceOf(Error)
    ;
  });
});
