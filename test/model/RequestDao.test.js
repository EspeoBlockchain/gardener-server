/* eslint-disable no-unused-expressions,array-callback-return */
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { assert } = require('chai').use(require('chai-as-promised'));
require('sinon-mongoose');

const RequestSchema = require('../../src/model/RequestSchema');
const RequestDao = require('../../src/model/RequestDao');

describe('RequestDao', () => {
  it('should return a promise with one request ready to execute', async () => {
    // given
    const request = {
      _id: '0xf1ab852ba724a867abc64dcbe0f0f0d6dcc23500e40e51ab5453fb2219fe9b56',
      url: 'json(https://api.coindesk.com/v1/bpi/currentprice.json).chartName',
      validFrom: new Date('2018-11-15T08:27:21.727Z'),
      startedAt: new Date('2018-11-15T08:27:21.723Z'),
      finishedAt: new Date('2018-11-15T08:39:57.658Z'),
    };
    const requestSchemaMock = sinon.mock(RequestSchema);
    requestSchemaMock.expects('findOne').chain('exec').resolves(request);

    // when
    const result = await new RequestDao().findSingleRequestReadyToExecute(new Date());

    // then
    assert.equal(result, request);
    requestSchemaMock.restore();
  });

  it('should return a promise with null if there are no requests ready to execute', async () => {
    // given
    const request = null;
    const requestSchemaMock = sinon.mock(RequestSchema);
    requestSchemaMock.expects('findOne').chain('exec').resolves(request);

    // when
    const result = await new RequestDao().findSingleRequestReadyToExecute(new Date());

    // then
    assert.equal(result, null);
    requestSchemaMock.restore();
  });

  it('should tag request as finished and saved', async () => {
    // given
    const id = '0x0';
    const expectedRequest = {
      _id: '0x0',
      url: 'url',
      validFrom: new Date(),
      startedAt: new Date(),
      finishedAt: new Date(),
    };

    const requestSchemaMock = sinon.mock(RequestSchema);
    requestSchemaMock.expects('findOneAndUpdate').withArgs({ _id: '0x0' }).resolves(expectedRequest).once();

    // when
    const result = await new RequestDao().tagRequestAsFinished(id);

    // then
    requestSchemaMock.verify();
    requestSchemaMock.restore();
    assert.isAbove(result.finishedAt, new Date(1));
  });
});
