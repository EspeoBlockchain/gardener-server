import { expect } from '@core/config/configuredChai';
import { beforeEach, describe, it } from 'mocha';

import Response from '@core/domain/response/Response';
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
