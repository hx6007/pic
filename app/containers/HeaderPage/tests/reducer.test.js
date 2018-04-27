
import { fromJS } from 'immutable';
import headerPageReducer from '../reducer';

describe('headerPageReducer', () => {
  it('returns the initial state', () => {
    expect(headerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
