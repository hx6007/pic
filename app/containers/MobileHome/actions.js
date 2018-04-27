/*
 *
 * MobileHome actions
 *
 */

import {
  DEFAULT_ACTION, LOADING, LOADING_ERROR, LOADING_SUCCESS,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const setGet = (keyword) => ({
  type: LOADING,
  keyword,
});

export const getList = (list) => ({
  type: LOADING_SUCCESS,
  list,
});

export const listErroe = (error) => ({
  type: LOADING_ERROR,
  error,
});
