
import { fromJS } from 'immutable';
import articleListReducer from '../reducer';

describe('articleListReducer', () => {
  it('returns the initial state', () => {
    expect(articleListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
