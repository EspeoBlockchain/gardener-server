import { expect } from 'chai';
import { describe, it } from 'mocha';
import RequestState from './RequestState';
import { RequestStateEnum } from './RequestStateEnum';

const stateMachine = [
  {
    name: 'Scheduled state',
    given: () => new RequestState(),
    correctTransitions: [
      {
        when: (s: RequestState) => s.markAsReady(),
        then: (s: RequestState) => expect(s.name).is.equal('Ready'),
      },
    ],
    incorrectTransitions: [
      { when: (s: RequestState) => s.markAsScheduled() },
      { when: (s: RequestState) => s.markAsProcessed() },
      { when: (s: RequestState) => s.markAsFinished() },
      { when: (s: RequestState) => s.markAsFailed() },
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
        when: (s: RequestState) => s.markAsProcessed(),
        then: (s: RequestState) => expect(s.name).is.equal('Processed'),
      },
    ],
    incorrectTransitions: [
      { when: (s: RequestState) => s.markAsScheduled() },
      { when: (s: RequestState) => s.markAsReady() },
      { when: (s: RequestState) => s.markAsFinished() },
      { when: (s: RequestState) => s.markAsFailed() },
    ],
  },
  {
    name: 'Processed state',
    given: () => new RequestState(RequestStateEnum.PROCESSED),
    correctTransitions: [
      {
        when: (s: RequestState) => s.markAsFinished(),
        then: (s: RequestState) => expect(s.name).is.equal('Finished'),
      },
      {
        when: (s: RequestState) => s.markAsFailed(),
        then: (s: RequestState) => expect(s.name).is.equal('Failed'),
      },
    ],
    incorrectTransitions: [
      { when: (s: RequestState) => s.markAsScheduled() },
      { when: (s: RequestState) => s.markAsReady() },
      { when: (s: RequestState) => s.markAsProcessed() },
    ],
  },
  {
    name: 'Finished state',
    given: () => new RequestState(RequestStateEnum.FINISHED),
    correctTransitions: [],
    incorrectTransitions: [
      { when: (s: RequestState) => s.markAsScheduled() },
      { when: (s: RequestState) => s.markAsReady() },
      { when: (s: RequestState) => s.markAsProcessed() },
      { when: (s: RequestState) => s.markAsFinished() },
      { when: (s: RequestState) => s.markAsFailed() },
    ],
  },
  {
    name: 'Failed state',
    given: () => new RequestState(RequestStateEnum.FAILED),
    correctTransitions: [],
    incorrectTransitions: [
      { when: (s: RequestState) => s.markAsScheduled() },
      { when: (s: RequestState) => s.markAsReady() },
      { when: (s: RequestState) => s.markAsProcessed() },
      { when: (s: RequestState) => s.markAsFinished() },
      { when: (s: RequestState) => s.markAsFailed() },
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
    expect(() => new RequestState('invalid' as RequestStateEnum)).to.throw();
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
