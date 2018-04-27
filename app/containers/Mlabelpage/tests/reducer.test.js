
import { fromJS } from 'immutable';
import mlabelpageReducer from '../reducer';

describe('mlabelpageReducer', () => {
  it('returns the initial state', () => {
    expect(mlabelpageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
