
import { fromJS } from 'immutable';
import adminLoginPageReducer from '../reducer';

describe('adminLoginPageReducer', () => {
  it('returns the initial state', () => {
    expect(adminLoginPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
