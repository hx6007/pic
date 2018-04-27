
import { fromJS } from 'immutable';
import adminUserPageReducer from '../reducer';

describe('adminUserPageReducer', () => {
  it('returns the initial state', () => {
    expect(adminUserPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
