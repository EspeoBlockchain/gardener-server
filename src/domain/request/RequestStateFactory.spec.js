const { describe, it } = require('mocha');
const { expect } = require('chai');
const RequestStateFactory = require('./RequestStateFactory');
const RequestState = require('./RequestState');

describe('RequestStateFactory', () => {
  const oneMinute = 60 * 1000;

  it('should create Scheduled state for validFrom ahead of now', () => {
    // given
    const validFrom = Date.now() + oneMinute;

    // when
    const state = RequestStateFactory.createState(validFrom);

    // then
    expect(state).to.be.instanceof(RequestState);
    expect(state.name).to.be.equal('Scheduled');
  });

  it('should create Ready state for validFrom equal now', () => {
    // given
    const validFrom = Date.now();

    // when
    const state = RequestStateFactory.createState(validFrom);

    // then
    expect(state).to.be.instanceof(RequestState);
    expect(state.name).to.be.equal('Ready');
  });

  it('should create Ready state for validFrom from the past', () => {
    // given
    const validFrom = Date.now() - oneMinute;

    // when
    const state = RequestStateFactory.createState(validFrom);

    // then
    expect(state).to.be.instanceof(RequestState);
    expect(state.name).to.be.equal('Ready');
  });
});
