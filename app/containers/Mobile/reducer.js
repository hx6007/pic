/*
 *
 * Mobile reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_TYPESUCCESS,
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
  footertype: false,
});

function mobileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_TYPESUCCESS:
      return state
      .set('footertype', action.footertype);
    default:
      return state;
  }
}

export default mobileReducer;
