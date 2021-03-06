/*
 *
 * LabelProductPage actions
 *
 */

import {
  CHANGE_PAGE, CHANGE_URL_PARAM,
  DEFAULT_ACTION, LOADING_PRODUCTLIST, LOADING_PRODUCTLIST_ERROR,
  LOADING_PRODUCTLIST_SUCCESS,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const loadList = (id) => ({
  type: LOADING_PRODUCTLIST,
  id,
});

export const listSuccess = (packs, count, name) => ({
  type: LOADING_PRODUCTLIST_SUCCESS,
  packs,
  count,
  name,
});

export const listLoadingError = (error) => ({
  type: LOADING_PRODUCTLIST_ERROR,
  error,
});

export const changePage = createAction(CHANGE_PAGE, 'page');
export const changeUrlParam = createAction(CHANGE_URL_PARAM, 'key', 'value');
