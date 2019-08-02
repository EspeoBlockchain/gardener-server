import { expect } from 'chai';
import { describe, it } from 'mocha';
import ResponseState from './ResponseState';

const stateMachine = [
  {
    name: 'Processed state',
    given: () => new ResponseState(),
    correctTransitions: [
      {
        when: (s: ResponseState) => s.markAsSent(),
        then: (s: ResponseState) => expect(s.name).is.equal('Sent'),
      },
      {
        when: (s: ResponseState) => s.markAsFailed(),
        then: (s: ResponseState) => expect(s.name).is.equal('Failed'),
      },
    ],
    incorrectTransitions: [] as void[],
  },
  {
    name: 'Sent state',
    given: () => {
      const state = new ResponseState();
      state.markAsSent();
      return state;
    },
    correctTransitions: [] as void[],
    incorrectTransitions: [
      { when: (s: ResponseState) => s.markAsSent() },
      { when: (s: ResponseState) => s.markAsFailed() },
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
      { when: (s: ResponseState) => s.markAsSent() },
      { when: (s: ResponseState) => s.markAsFailed() },
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
      testCase.correctTransitions.forEach((transition: any) => {
        // given
        const state = testCase.given();
        // when
        transition.when(state);
        // then
        transition.then(state);
      });

      testCase.incorrectTransitions.forEach((transition: any) => {
        // given
        const state = testCase.given();
        // then expected exception
        expect(() => transition.when(state)).to.throw(); // FIXME error message
      });
    });
  });
});
