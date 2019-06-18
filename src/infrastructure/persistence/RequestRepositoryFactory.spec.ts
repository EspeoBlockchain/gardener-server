import { describe, it } from 'mocha';
import { expect } from 'chai';
import RequestRepositoryFactory from './RequestRepositoryFactory';
import InMemoryRequestRepository from './inmemory/InMemoryRequestRepositoryAdapter';
import MongoDBRequestRepository from './mongodb/MongoDbRequestRepositoryAdapter';
import { logger } from '../../domain/common/utils/TestMocks';

describe('RequestRepositoryFactory', () => {
  it('should create InMemoryRequestRepository when type is INMEMORY', () => {
    // when
    const requestRepository = RequestRepositoryFactory.create('INMEMORY', logger);
    // then
    expect(requestRepository).to.be.an.instanceOf(InMemoryRequestRepository);
  });

  it('should create MongoDBRequestRepository when type if MONGODB', () => {
    // when
    const requestRepository = RequestRepositoryFactory.create('MONGODB', logger);
    // then
    expect(requestRepository).to.be.an.instanceOf(MongoDBRequestRepository);
  });

  it('should fail if type is neither INMEMORY nor MONGODB', () => {
    // when/then
    expect(() => RequestRepositoryFactory.create('INVALID', logger)).to.throw();
  });
});
