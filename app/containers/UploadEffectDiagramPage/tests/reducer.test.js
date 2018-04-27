
import { fromJS } from 'immutable';
import uploadEffectDiagramPageReducer from '../reducer';

describe('uploadEffectDiagramPageReducer', () => {
  it('returns the initial state', () => {
    expect(uploadEffectDiagramPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
