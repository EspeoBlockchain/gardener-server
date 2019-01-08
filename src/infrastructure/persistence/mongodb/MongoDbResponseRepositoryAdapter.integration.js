const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const mongoose = require('mongoose');
const Response = require('../../../domain/response/Response');
const MongoDBResponseRepositoryAdapter = require('./MongoDbResponseRepositoryAdapter');
const ConsoleLoggerAdapter = require('../../../adapter/ConsoleLoggerAdapter');
const ResponseModel = require('./ResponseModel');

describe('MongoDBResponseRepositoryAdapter', () => {
  let sut;

  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:37017/oracle-server', { useNewUrlParser: true });
    await ResponseModel.deleteMany({});
    const logger = new ConsoleLoggerAdapter();
    sut = new MongoDBResponseRepositoryAdapter(logger);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('should save Response to database', () => {
    // given
    const response = new Response('1');

    // when, then
    return expect(sut.save(response)).to.be.fulfilled;
  });
});
