import { describe, it } from 'mocha';
import { expect } from 'chai';
import ResponseState from './ResponseState';

const stateMachine = [
  {
    name: 'Processed state',
    given: () => new ResponseState(),
    correctTransitions: [
      {
        when: s => s.markAsSent(),
        then: s => expect(s.name).is.equal('Sent'),
      },
      {
        when: s => s.markAsFailed(),
        then: s => expect(s.name).is.equal('Failed'),
      },
    ],
    incorrectTransitions: [],
  },
  {
    name: 'Sent state',
    given: () => {
      const state = new ResponseState();
      state.markAsSent();
      return state;
    },
    correctTransitions: [],
    incorrectTransitions: [
      { when: s => s.markAsSent() },
      { when: s => s.markAsFailed() },
    ],
  },
  {
    name: 'Failed state',
    given: () => {
      const state = new ResponseState();
      state.markAsFailed();
      return state;
    },
    correctTransitions: [],
    incorrectTransitions: [
      { when: s => s.markAsSent() },
      { when: s => s.markAsFailed() },
    ],
  },
];

describe('ResponseState', () => {
  it('should create new state as Processed', () => {
    // when
    const state = new ResponseState();
    // then
    expect(state.name).to.equal('Processed');
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
