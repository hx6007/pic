/*
 *
 * Muploadlist reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION, CHANGE_STATUS
} from './constants';

const initialState = fromJS({
	status:0
});

function muploadlistReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
      case CHANGE_STATUS:
      return state
      .set('status',action.status);
    default:
      return state;
  }
}

export default muploadlistReducer;
