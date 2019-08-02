import { expect } from 'chai';
import { describe, it } from 'mocha';
import SilentLoggerAdapter from '@core/application/logger/SilentLoggerAdapter';
import InMemoryResponseRepository from './inmemory/InMemoryResponseRepositoryAdapter';
import MongoDbResponseRepository from './mongodb/MongoDbResponseRepositoryAdapter';
import ResponseRepositoryFactory from './ResponseRepositoryFactory';

describe('ResponseRepositoryFactory', () => {
  it('should create InMemoryResponseRepository when type is INMEMORY', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('INMEMORY', new SilentLoggerAdapter());
    // then
    expect(responseRepository).to.be.an.instanceOf(InMemoryResponseRepository);
  });

  it('should create MongoDbResponseRepository when type if MONGODB', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('MONGODB', new SilentLoggerAdapter());
    // then
    expect(responseRepository).to.be.an.instanceOf(MongoDbResponseRepository);
  });

  it('should fail if type is neither INMEMORY nor MONGODB', () => {
    // when/then
    expect(() => ResponseRepositoryFactory.create('INVALID',  new SilentLoggerAdapter())).to.throw();
  });
});
