
import { fromJS } from 'immutable';
import seriesEditPageReducer from '../reducer';

describe('seriesEditPageReducer', () => {
  it('returns the initial state', () => {
    expect(seriesEditPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
