
import { fromJS } from 'immutable';
import effectDiagramListPageReducer from '../reducer';

describe('effectDiagramListPageReducer', () => {
  it('returns the initial state', () => {
    expect(effectDiagramListPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
