
import { fromJS } from 'immutable';
import userPackEditPageReducer from '../reducer';

describe('userPackEditPageReducer', () => {
  it('returns the initial state', () => {
    expect(userPackEditPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
