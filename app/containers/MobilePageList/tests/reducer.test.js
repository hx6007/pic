
import { fromJS } from 'immutable';
import mobilePageListReducer from '../reducer';

describe('mobilePageListReducer', () => {
  it('returns the initial state', () => {
    expect(mobilePageListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
