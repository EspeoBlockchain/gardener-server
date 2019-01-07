const { describe, it } = require('mocha');
const { expect } = require('chai');
const ResponseRepositoryFactory = require('./ResponseRepositoryFactory');
const InMemoryResponseRepository = require('./inmemory/InMemoryResponseRepositoryAdapter');
const MongoDBResponseRepository = require('./mongodb/MongoDBResponseRepositoryAdapter');
const { logger } = require('../../domain/common/utils/TestMocks');


describe('ResponseRepositoryFactory', () => {
  it('should create InMemoryResponseRepository when type is INMEMORY', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('INMEMORY', logger);
    // then
    expect(responseRepository).to.be.an.instanceOf(InMemoryResponseRepository);
  });

  it('should create MongoDBResponseRepository when type if MONGODB', () => {
    // when
    const responseRepository = ResponseRepositoryFactory.create('MONGODB', logger);
    // then
    expect(responseRepository).to.be.an.instanceOf(MongoDBResponseRepository);
  });

  it('should fail if type is neither INMEMORY nor MONGODB', () => {
    // when/then
    expect(() => ResponseRepositoryFactory.create('INVALID', logger)).to.throw();
  });
});
