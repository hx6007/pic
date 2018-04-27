
import { fromJS } from 'immutable';
import topicsListPageReducer from '../reducer';

describe('topicsListPageReducer', () => {
  it('returns the initial state', () => {
    expect(topicsListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
