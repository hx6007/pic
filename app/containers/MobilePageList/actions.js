/*
 *
 * MobilePageList actions
 *
 */

import {
  DEFAULT_ACTION, LOADING, LOADING_SUCCESS, LOADING_ERROR, CHANGE_URL_PARAM, SEARCH, CHANGE_PAGE, SEARCH_SUCCESS,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const loadList = () => ({
  type: LOADING,
});

export const listSuccess = (packs, count) => ({
  type: LOADING_SUCCESS,
  packs,
  count,
});

export const listLoadingError = (err) => ({
  type: LOADING_ERROR,
  err,
});
export const setGet = (keyword) => ({
  type: SEARCH,
  keyword,
});
export const getList = (list) => ({
  type: SEARCH_SUCCESS,
  list,
});

export const changepage = (page) => ({
  type: CHANGE_PAGE,
  page,
});

export const changeUrlParam = createAction(CHANGE_URL_PARAM, 'key', 'value');
