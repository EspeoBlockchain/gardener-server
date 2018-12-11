const { describe, it } = require('mocha');
const { expect } = require('chai');
const RequestState = require('./RequestState');

const stateMachine = [
  {
    name: 'Scheduled state',
    given: () => new RequestState(),
    correctTransitions: [
      {
        when: s => s.markAsReady(),
        then: s => expect(s.name).is.equal('Ready'),
      },
    ],
    incorrectTransitions: [
      { when: s => s.markAsScheduled() },
      { when: s => s.markAsProcessed() },
      { when: s => s.markAsFinished() },
      { when: s => s.markAsFailed() },
    ],
  },
  {
    name: 'Ready state',
    given: () => {
      const state = new RequestState();
      state.markAsReady();
      return state;
    },
    correctTransitions: [
      {
        when: s => s.markAsProcessed(),
        then: s => expect(s.name).is.equal('Processed'),
      },
    ],
    incorrectTransitions: [
      { when: s => s.markAsScheduled() },
      { when: s => s.markAsReady() },
      { when: s => s.markAsFinished() },
      { when: s => s.markAsFailed() },
    ],
  },
  {
    name: 'Processed state',
    given: () => new RequestState('Processed'),
    correctTransitions: [
      {
        when: s => s.markAsFinished(),
        then: s => expect(s.name).is.equal('Finished'),
      },
      {
        when: s => s.markAsFailed(),
        then: s => expect(s.name).is.equal('Failed'),
      },
    ],
    incorrectTransitions: [
      { when: s => s.markAsScheduled() },
      { when: s => s.markAsReady() },
      { when: s => s.markAsProcessed() },
    ],
  },
  {
    name: 'Finished state',
    given: () => new RequestState('Finished'),
    correctTransitions: [],
    incorrectTransitions: [
      { when: s => s.markAsScheduled() },
      { when: s => s.markAsReady() },
      { when: s => s.markAsProcessed() },
      { when: s => s.markAsFinished() },
      { when: s => s.markAsFailed() },
    ],
  },
  {
    name: 'Failed state',
    given: () => new RequestState('Failed'),
    correctTransitions: [],
    incorrectTransitions: [
      { when: s => s.markAsScheduled() },
      { when: s => s.markAsReady() },
      { when: s => s.markAsProcessed() },
      { when: s => s.markAsFinished() },
      { when: s => s.markAsFailed() },
    ],
  },
];

describe('RequestState', () => {
  it('should create new state as Scheduled', () => {
    // when
    const state = new RequestState();
    // then
    expect(state.name).to.equal('Scheduled');
  });

  it('should not allow create state with invalid name', () => {
    // when
    expect(() => new RequestState('invalid')).to.throw();
  });

  stateMachine.forEach((testCase) => {
    it(`should pass ${testCase.name} transitions`, () => {
      testCase.correctTransitions.forEach((transition) => {
        // given
        const state = testCase.given();
        // when
        transition.when(state);
        // then
        transition.then(state);
      });

      testCase.incorrectTransitions.forEach((transition) => {
        // given
        const state = testCase.given();
        // then expected exception
        expect(() => transition.when(state)).to.throw(); // FIXME error message
      });
    });
  });
});
