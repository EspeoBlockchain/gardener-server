import { describe, it } from 'mocha';
import { expect } from 'chai';
import ResponseRepositoryFactory from './ResponseRepositoryFactory';
import InMemoryResponseRepository from './inmemory/InMemoryResponseRepositoryAdapter';
import MongoDbResponseRepository from './mongodb/MongoDbResponseRepositoryAdapter';
import { logger } from '../../domain/common/utils/TestMocks';


describe('ResponseRepositoryFactory', () => {
  it('should create InMemoryResponseRepository when type is INMEMORY', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('INMEMORY', logger);
    // then
    expect(responseRepository).to.be.an.instanceOf(InMemoryResponseRepository);
  });

  it('should create MongoDbResponseRepository when type if MONGODB', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('MONGODB', logger);
    // then
    expect(responseRepository).to.be.an.instanceOf(MongoDbResponseRepository);
  });

  it('should fail if type is neither INMEMORY nor MONGODB', () => {
    // when/then
    expect(() => ResponseRepositoryFactory.create('INVALID', logger)).to.throw();
  });
});
