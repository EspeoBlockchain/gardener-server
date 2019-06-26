import { expect } from 'chai';
import { describe, it } from 'mocha';
import {ConsoleLoggerAdapter} from '../../adapter';
import InMemoryResponseRepository from './inmemory/InMemoryResponseRepositoryAdapter';
import MongoDbResponseRepository from './mongodb/MongoDbResponseRepositoryAdapter';
import ResponseRepositoryFactory from './ResponseRepositoryFactory';

describe('ResponseRepositoryFactory', () => {
  it('should create InMemoryResponseRepository when type is INMEMORY', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('INMEMORY', new ConsoleLoggerAdapter());
    // then
    expect(responseRepository).to.be.an.instanceOf(InMemoryResponseRepository);
  });

  it('should create MongoDbResponseRepository when type if MONGODB', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('MONGODB', new ConsoleLoggerAdapter());
    // then
    expect(responseRepository).to.be.an.instanceOf(MongoDbResponseRepository);
  });

  it('should fail if type is neither INMEMORY nor MONGODB', () => {
    // when/then
    expect(() => ResponseRepositoryFactory.create('INVALID',  new ConsoleLoggerAdapter())).to.throw();
  });
});
