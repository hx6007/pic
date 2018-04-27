
import { fromJS } from 'immutable';
import mobileReducer from '../reducer';

describe('mobileReducer', () => {
  it('returns the initial state', () => {
    expect(mobileReducer(undefined, {})).toEqual(fromJS({}));
  });
});
