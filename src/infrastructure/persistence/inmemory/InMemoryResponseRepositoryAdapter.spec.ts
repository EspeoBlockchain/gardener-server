import { beforeEach, describe, it } from 'mocha';
const { expect } = require('chai').use(require('chai-as-promised'));
import Response from '../../../domain/response/Response';
import InMemoryResponseRepository from './InMemoryResponseRepositoryAdapter';

describe('InMemoryResponseRepositoryAdapter', () => {
  let sut: InMemoryResponseRepository;

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
