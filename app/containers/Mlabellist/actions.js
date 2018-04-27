/*
 *
 * Mlabellist actions
 *
 */

import {
  DEFAULT_ACTION, LOADING, LOADING_SUCCESS, LOADING_ERROR, SEARCH, SEARCH_SUCCESS, CHANGE_URL_PARAM,
} from './constants';
import { createAction } from '../../utils/actionCreator';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const loadList = (id) => ({
  type: LOADING,
  id,
});

export const listSuccess = (packs, count, name) => ({
  type: LOADING_SUCCESS,
  packs,
  count,
  name,
});

export const listLoadingError = (error) => ({
  type: LOADING_ERROR,
  error,
});
export const setGet = (keyword) => ({
  type: SEARCH,
  keyword,
});
export const getList = (list) => ({
  type: SEARCH_SUCCESS,
  list,
});
export const changeUrlParam = createAction(CHANGE_URL_PARAM, 'key', 'value');
