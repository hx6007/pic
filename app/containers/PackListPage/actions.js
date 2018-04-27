/*
 *
 * PackListPage actions
 *
 */

import {
  LOAD_PACKS, LOAD_PACKS_SUCCESS, LOAD_PACKS_ERROR, DEL_PACK, UPDATE_KEYWORD, UPDATE_PAGE_NO, DEL_PACK_ERROR
} from './constants';
import {createAction} from "../../utils/actionCreator";

export const loadPacks = (packType,keyword,pageNo,pageSize) => ({
  type: LOAD_PACKS,
  packType,
  keyword,
  pageNo,
  pageSize,
});

export const packsLoaded = (packs,totalCount) => ({
  type: LOAD_PACKS_SUCCESS,
  packs,
  totalCount
});

export const packsLoadingError = (error) => ({
  type: LOAD_PACKS_ERROR,
  error
});

export const delPack=createAction(DEL_PACK,'packId');
export const delPackError=createAction(DEL_PACK_ERROR,'error');
export const updateKeyword=createAction(UPDATE_KEYWORD,'keyword');
export const updatePage=createAction(UPDATE_PAGE_NO,'page');
