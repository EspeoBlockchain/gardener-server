const { describe, it } = require('mocha');
const { expect } = require('chai');
const Response = require('./Response');

describe('Response', () => {
  it('should be created in Processed state for given requestId', () => {
    // given
    const requestId = 'qwerty12345';
    // when
    const response = new Response(requestId);
    // then
    expect(response.requestId).to.equal(requestId);
    expect(response.state.name).to.equal('Processed');
  });

  it('should add fetched data to previously created response', () => {
    // given
    const response = new Response('qwerty12345');
    // when
    response.addFetchedData('fetched');
    // then
    expect(response.fetchedData).to.equal('fetched');
  });

  it('should reject to add fetched data if it is already in response', () => {
    // given
    const response = new Response('qwerty12345');
    response.addFetchedData('fetched');
    // when
    expect(() => response.addFetchedData('secondFetched')).to.throw();
  });

  it('should add selected data to response with passed fetched data', () => {
    // given
    const response = new Response('qwerty12345');
    response.addFetchedData('fetched');
    // when
    response.addSelectedData('selected');
    // then
    expect(response.selectedData).to.equal('selected');
  });

  it('should reject to add selected data if it is already in response', () => {
    // given
    const response = new Response('qwerty12345');
    response.addFetchedData('fetched');
    response.addSelectedData('selected');
    // when
    expect(() => response.addSelectedData('secondSelected')).to.throw();
  });

  it('should reject adding selected data if fetched data not passed', () => {
    // given
    const response = new Response('qwerty12345');
    // when
    expect(() => response.addSelectedData('selected')).to.throw();
  });
});
