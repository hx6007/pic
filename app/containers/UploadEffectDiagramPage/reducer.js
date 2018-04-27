/*
 *
 * UploadEffectDiagramPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import { LOAD_PACK, LOAD_PACK_SUCCESS, LOAD_UPLOAD_TOKEN_SUCCESS } from '../App/constants';

const initialState = fromJS({
  effectDiagram: null,
  uploadToken: null,
});

function uploadEffectDiagramPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_PACK:
      return state.set('effectDiagram', null);
    case LOAD_PACK_SUCCESS:
      return state.set('effectDiagram', action.pack);
    case LOAD_UPLOAD_TOKEN_SUCCESS:
      return state.set('uploadToken', action.token);
    default:
      return state;
  }
}

export default uploadEffectDiagramPageReducer;
