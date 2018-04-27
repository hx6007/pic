
import { fromJS } from 'immutable';
import mloginReducer from '../reducer';

describe('mloginReducer', () => {
  it('returns the initial state', () => {
    expect(mloginReducer(undefined, {})).toEqual(fromJS({}));
  });
});
