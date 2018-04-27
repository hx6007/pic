/*
 *
 * PackEditPage actions
 *
 */

import {
  GO_LIST, LOAD_SEARCH, LOAD_SEARCH_SUCCESS,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export const loadSearch = createAction(LOAD_SEARCH, 'keyword');
export const loadSearchSuccess = createAction(LOAD_SEARCH_SUCCESS, 'searchList');
export const goList = createAction(GO_LIST, 'keyword');
