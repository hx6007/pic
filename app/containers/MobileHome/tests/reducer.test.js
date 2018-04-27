
import { fromJS } from 'immutable';
import mobileHomeReducer from '../reducer';

describe('mobileHomeReducer', () => {
  it('returns the initial state', () => {
    expect(mobileHomeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
