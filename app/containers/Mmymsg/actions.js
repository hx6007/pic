/*
 *
 * Mmymsg actions
 *
 */

import {
  DEFAULT_ACTION, GET_DATA, GET_DATA_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadingData() {
  return {
    type: GET_DATA,
  };
}

export function loadingDatasuccess(userdata) {
  return {
    type: GET_DATA_SUCCESS,
    userdata,
  };
}
export function loadingDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error,
  };
}
