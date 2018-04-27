
import { fromJS } from 'immutable';
import packEditPageReducer from '../reducer';

describe('packEditPageReducer', () => {
  it('returns the initial state', () => {
    expect(packEditPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
