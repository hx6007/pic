
import { fromJS } from 'immutable';
import labelReducer from '../reducer';

describe('labelReducer', () => {
  it('returns the initial state', () => {
    expect(labelReducer(undefined, {})).toEqual(fromJS({}));
  });
});
