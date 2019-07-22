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
        when: (s: any) => s.markAsReady(),
        then: (s: any) => expect(s.name).is.equal('Ready'),
      },
    ],
    incorrectTransitions: [
      { when: (s: any) => s.markAsScheduled() },
      { when: (s: any) => s.markAsProcessed() },
      { when: (s: any) => s.markAsFinished() },
      { when: (s: any) => s.markAsFailed() },
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
        when: (s: any) => s.markAsProcessed(),
        then: (s: any) => expect(s.name).is.equal('Processed'),
      },
    ],
    incorrectTransitions: [
      { when: (s: any) => s.markAsScheduled() },
      { when: (s: any) => s.markAsReady() },
      { when: (s: any) => s.markAsFinished() },
      { when: (s: any) => s.markAsFailed() },
    ],
  },
  {
    name: 'Processed state',
    given: () => new RequestState(RequestStateEnum.PROCESSED),
    correctTransitions: [
      {
        when: (s: any) => s.markAsFinished(),
        then: (s: any) => expect(s.name).is.equal('Finished'),
      },
      {
        when: (s: any) => s.markAsFailed(),
        then: (s: any) => expect(s.name).is.equal('Failed'),
      },
    ],
    incorrectTransitions: [
      { when: (s: any) => s.markAsScheduled() },
      { when: (s: any) => s.markAsReady() },
      { when: (s: any) => s.markAsProcessed() },
    ],
  },
  {
    name: 'Finished state',
    given: () => new RequestState(RequestStateEnum.FINISHED),
    correctTransitions: [],
    incorrectTransitions: [
      { when: (s: any) => s.markAsScheduled() },
      { when: (s: any) => s.markAsReady() },
      { when: (s: any) => s.markAsProcessed() },
      { when: (s: any) => s.markAsFinished() },
      { when: (s: any) => s.markAsFailed() },
    ],
  },
  {
    name: 'Failed state',
    given: () => new RequestState(RequestStateEnum.FAILED),
    correctTransitions: [],
    incorrectTransitions: [
      { when: (s: any) => s.markAsScheduled() },
      { when: (s: any) => s.markAsReady() },
      { when: (s: any) => s.markAsProcessed() },
      { when: (s: any) => s.markAsFinished() },
      { when: (s: any) => s.markAsFailed() },
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
    expect(() => new RequestState('invalid' as any)).to.throw();
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
