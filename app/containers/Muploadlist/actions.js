/*
 *
 * Muploadlist actions
 *
 */

import {
  DEFAULT_ACTION, CHANGE_STATUS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeStatus(status) {
  return {
    type: CHANGE_STATUS,
    status,
  };
}
