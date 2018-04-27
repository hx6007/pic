
import { fromJS } from 'immutable';
import labelProductPageReducer from '../reducer';

describe('labelProductPageReducer', () => {
  it('returns the initial state', () => {
    expect(labelProductPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
