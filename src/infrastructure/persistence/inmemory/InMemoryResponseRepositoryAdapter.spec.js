const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const Response = require('../../../domain/response/Response');
const InMemoryResponseRepository = require('./InMemoryResponseRepositoryAdapter');


describe('InMemoryResponseRepositoryAdapter', () => {
  let sut;

  beforeEach(async () => {
    sut = new InMemoryResponseRepository();
  });

  it('should save Response to database', () => {
    // given
    const response = new Response('1');

    // when, then
    return expect(() => sut.save(response)).to.not.throw();
  });
});
