const { describe, it } = require('mocha');
const { expect } = require('chai');
const RequestRepositoryFactory = require('./RequestRepositoryFactory');
const InMemoryRequestRepository = require('./inmemory/InMemoryRequestRepositoryAdapter');
const MongoDBRequestRepository = require('./mongodb/MongoDBRequestRepositoryAdapter');
const { logger } = require('../../domain/common/utils/TestMocks');

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
