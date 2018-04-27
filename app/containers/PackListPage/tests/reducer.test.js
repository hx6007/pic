
import { fromJS } from 'immutable';
import packListPageReducer from '../reducer';

describe('packListPageReducer', () => {
  it('returns the initial state', () => {
    expect(packListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
