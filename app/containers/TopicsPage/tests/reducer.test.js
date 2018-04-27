
import { fromJS } from 'immutable';
import topicsPageReducer from '../reducer';

describe('topicsPageReducer', () => {
  it('returns the initial state', () => {
    expect(topicsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
