const { describe, it, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const mongoose = require('mongoose');
const Request = require('../../../domain/request/Request');
const MongoDBRequestRepositoryAdapter = require('./MongoDBRequestRepositoryAdapter');
const ConsoleLoggerAdapter = require('../../../adapter/ConsoleLoggerAdapter');
const RequestModel = require('./RequestModel');

describe('MongoDBRequestRepositoryAdapter', () => {
  let sut;

  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:37017/oracle-server', { useNewUrlParser: true });
    await RequestModel.deleteMany({});
    const logger = new ConsoleLoggerAdapter();
    sut = new MongoDBRequestRepositoryAdapter(logger);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('should save Request to database', () => {
    // given
    const request = new Request('1', 'url', new Date(), 'Processed');

    // when, then
    return expect(sut.save(request)).to.be.fulfilled;
  });

  it('should get scheduled requests with validFrom parameter before now', async () => {
    // given
    const request1 = new Request('1', 'url', new Date(), 'Scheduled');
    const request2 = new Request('2', 'url', new Date(Date.now() + 2000), 'Scheduled');
    await sut.save(request1);
    await sut.save(request2);

    // when
    const results = await sut.getScheduledRequestsWithValidFromBeforeNow();

    // then
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.deep.equal(request1);
  });

  it('should get requests with Ready status', async () => {
    // given
    const request1 = new Request('1', 'url', new Date(), 'Ready');
    const request2 = new Request('2', 'url', new Date(), 'Scheduled');
    await sut.save(request1);
    await sut.save(request2);

    // when
    const results = await sut.getReadyRequests();

    // then
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.deep.equal(request1);
  });
});
