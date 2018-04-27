
import { fromJS } from 'immutable';
import mproductPageReducer from '../reducer';

describe('mproductPageReducer', () => {
  it('returns the initial state', () => {
    expect(mproductPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
