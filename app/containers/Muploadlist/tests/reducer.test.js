
import { fromJS } from 'immutable';
import muploadlistReducer from '../reducer';

describe('muploadlistReducer', () => {
  it('returns the initial state', () => {
    expect(muploadlistReducer(undefined, {})).toEqual(fromJS({}));
  });
});
