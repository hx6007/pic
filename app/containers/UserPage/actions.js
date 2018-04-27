/*
 *
 * UserPage actions
 *
 */

import {
  DEFAULT_ACTION, GET_DATA, GET_DATA_SUCCESS, GET_DATA_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadingData(token,userid) {
  return {
    type: GET_DATA,
    token,
    userid
  };
}

export function loadingDatasuccess(userdata) {
  return {
    type: GET_DATA_SUCCESS,
    userdata
  };
}
export function loadingDataError(error) {
  return {
    type: GET_DATA_ERROR,
    error
  };
}
