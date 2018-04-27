
import { fromJS } from 'immutable';
import mlabellistReducer from '../reducer';

describe('mlabellistReducer', () => {
  it('returns the initial state', () => {
    expect(mlabellistReducer(undefined, {})).toEqual(fromJS({}));
  });
});
