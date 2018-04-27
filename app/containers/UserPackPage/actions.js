/*
 *
 * UserPackPage actions
 *
 */
import { LOAD_PACKS, UPDATE_PAGE_NO } from './constants';
import { createAction } from '../../utils/actionCreator';

export const loadPacks = (packType,keyword,pageNo,pageSize) => ({
  type: LOAD_PACKS,
  packType,
  keyword,
  pageNo,
  pageSize,
});

export const updatePage = createAction(UPDATE_PAGE_NO, 'page');
