/*
 *
 * SeriesEditPage actions
 *
 */

import {
  SAVE_TAG, SAVE_TAG_SUCCESS, SAVE_TAG_ERROR, LOAD_TAG, LOAD_TAG_ERROR, LOAD_TAG_SUCCESS, LOAD_SEARCH, LOAD_SEARCH_ERROR, LOAD_SEARCH_SUCCESS,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export const loadSearch = createAction(LOAD_SEARCH, 'keyword');
export const loadSearchSuccess = createAction(LOAD_SEARCH_SUCCESS, 'searchList');
export const loadSearchError = createAction(LOAD_SEARCH_ERROR, 'error');

export const saveTag = createAction(SAVE_TAG, 'id', 'name', 'describe', 'packIds');
export const saveTagSuccess = createAction(SAVE_TAG_SUCCESS, 'serverTag');
export const saveTagError = createAction(SAVE_TAG_ERROR, 'error');

export const loadTag = createAction(LOAD_TAG, 'id');
export const loadTagSuccess = createAction(LOAD_TAG_SUCCESS, 'tag');
export const loadTagError = createAction(LOAD_TAG_ERROR, 'error');

