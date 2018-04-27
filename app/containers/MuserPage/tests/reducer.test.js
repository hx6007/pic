
import { fromJS } from 'immutable';
import muserPageReducer from '../reducer';

describe('muserPageReducer', () => {
  it('returns the initial state', () => {
    expect(muserPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
