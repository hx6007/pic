
import { fromJS } from 'immutable';
import mmymsgReducer from '../reducer';

describe('mmymsgReducer', () => {
  it('returns the initial state', () => {
    expect(mmymsgReducer(undefined, {})).toEqual(fromJS({}));
  });
});
