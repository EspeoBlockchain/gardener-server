/* eslint-disable no-unused-expressions,array-callback-return */
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { assert } = require('chai');
const Database = require('../../src/utils/Database');
require('sinon-mongoose');

const DataSchema = require('../../src/model/DataSchema');
const RequestSchema = require('../../src/model/RequestSchema');
const DataDao = require('../../src/model/DataDao');
const RequestDao = require('../../src/model/RequestDao');

describe('DataDao', () => {
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


    const database = new Database('localhost:37017', 'oracle-server');
    database.connect();
    await RequestSchema.remove({});
    await DataSchema.remove({});

    await new RequestDao().saveRequest(request);

    const dataAmountBefore = await DataSchema.count();

    // when
    await new DataDao().saveData(request.id, data);

    // then
    const dataAmountAfter = await DataSchema.count();
    assert.equal(dataAmountAfter - dataAmountBefore, 1, 'Should add one document');
    Database.disconnect();
  });
});
