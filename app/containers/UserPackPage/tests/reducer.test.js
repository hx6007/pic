
import { fromJS } from 'immutable';
import userPackPageReducer from '../reducer';

describe('userPackPageReducer', () => {
  it('returns the initial state', () => {
    expect(userPackPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
