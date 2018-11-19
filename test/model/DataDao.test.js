/* eslint-disable no-unused-expressions,array-callback-return */
const {
  describe, it, before, after,
} = require('mocha');
const sinon = require('sinon');
const { assert } = require('chai');
require('sinon-mongoose');
const connectDatabase = require('../../src/utils/connectDatabase');


const DataSchema = require('../../src/model/DataSchema');
const RequestSchema = require('../../src/model/RequestSchema');
const DataDao = require('../../src/model/DataDao');
const RequestDao = require('../../src/model/RequestDao');

describe('DataDao', () => {
  const sut = {};

  before(async () => {
    sut.db = await connectDatabase();
  });

  after(async () => {
    await sut.db.disconnect();
  });

  it('should find data for request id', async () => {
    // given
    const data = {
      request_id: '1',
      fetchedData: 'fetchedData',
      selectedData: 'selectedData',
    };
    const dataMock = sinon.mock(DataSchema);
    dataMock.expects('findOne').chain('exec').resolves(data).once();

    // when
    const result = await new DataDao().findDataByRequestId('1');

    // then
    dataMock.verify();
    dataMock.restore();
    assert.deepEqual(result, data);
  });

  it('should save data', async () => {
    // given
    const request = {
      id: '1',
      url: 'url',
      validFrom: new Date(),
      startedAt: new Date(),
    };

    const data = {
      fetchedData: 'fetched',
      selectedData: 'selected',
    };

    await RequestSchema.deleteMany({});
    await DataSchema.deleteMany({});

    await new RequestDao().saveRequest(request);

    const dataAmountBefore = await DataSchema.countDocuments();

    // when
    await new DataDao().saveData(request.id, data);

    // then
    const dataAmountAfter = await DataSchema.countDocuments();
    assert.equal(dataAmountAfter - dataAmountBefore, 1, 'Should add one document');
  });
});
