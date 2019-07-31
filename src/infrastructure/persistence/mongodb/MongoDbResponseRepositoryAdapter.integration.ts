const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));

import ConsoleLoggerAdapter from '@core/application/logger/ConsoleLoggerAdapter';
import Response from '@core/domain/response/Response';
import * as mongoose from 'mongoose';
import MongoDbResponseRepositoryAdapter from './MongoDbResponseRepositoryAdapter';
import ResponseModel from './ResponseModel';

describe('MongoDbResponseRepositoryAdapter', () => {
  let sut: MongoDbResponseRepositoryAdapter;

  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:37017/oracle-server', { useNewUrlParser: true });
    await ResponseModel.deleteMany({});
    const logger = new ConsoleLoggerAdapter();
    sut = new MongoDbResponseRepositoryAdapter(logger);
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
