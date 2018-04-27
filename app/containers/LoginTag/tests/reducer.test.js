
import { fromJS } from 'immutable';
import loginTagReducer from '../reducer';

describe('loginTagReducer', () => {
  it('returns the initial state', () => {
    expect(loginTagReducer(undefined, {})).toEqual(fromJS({}));
  });
});
