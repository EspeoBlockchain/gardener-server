const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const RequestRepositoryPort = require('./RequestRepositoryPort');

describe('RequestRepositoryPort', () => {
  let sut;

  beforeEach(() => {
    sut = new RequestRepositoryPort();
  });

  it('should have exists methods, which throw an error', () => {
    // when, then
    expect(() => sut.exists('1')).to.throw();
  });
});
