/*
 *
 * PackEditPage actions
 *
 */

import {
  DEFAULT_ACTION, LOAD_SEARCH, LOAD_SEARCH_SUCCESS, LOAD_SEARCH_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const loadSearch = (keyword,typeh) => ({
  type: LOAD_SEARCH,
  keyword,
  typeh,
});

export const searchLoaded = (searchList) => ({
  type: LOAD_SEARCH_SUCCESS,
  searchList,
});

export const searchLoadingError = (error) => ({
  type: LOAD_SEARCH_ERROR,
  error,
});

