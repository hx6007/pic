/*
 *
 * PackEditPage actions
 *
 */

import {
  LOAD_SEARCH, LOAD_SEARCH_SUCCESS, LOAD_SEARCH_ERROR, SAVE_PACK,
  SAVE_PACK_SUCCESS, SAVE_PACK_ERROR,
  LOAD_UPLOAD_TOKEN, LOAD_UPLOAD_TOKEN_SUCCESS, LOAD_UPLOAD_TOKEN_ERROR,
  LOAD_PACK, LOAD_PACK_SUCCESS, LOAD_PACK_ERROR, ADD_PRODUCT,
  UPDATE_PRODUCTS, DELETE_PRODUCT, UPDATE_COVER, UPDATE_DESIGNER,
  UPDATE_ADDRESS, UPDATE_BRAND, UPDATE_SHOP, UPDATE_DEPARTMENT, UPDATE_TYPE,
  UPDATE_STATUS, UPDATE_DECORATE_DATE, UPDATE_AREA, RESET_PACK, UPDATE_SITES,
  UPDATE_STYLES, UPDATE_SPACES, UPDATE_IMAGES, UPDATE_TAGS,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export const addProduct = createAction(ADD_PRODUCT, 'index');
export const delProduct = createAction(DELETE_PRODUCT, 'index');

export const updateProducts = createAction(UPDATE_PRODUCTS, 'products');
export const updateCover = createAction(UPDATE_COVER, 'cover');
export const updateImages = createAction(UPDATE_IMAGES, 'images');
export const updateDesigner = createAction(UPDATE_DESIGNER, 'designer');
export const updateDepartment = createAction(UPDATE_DEPARTMENT, 'department');
export const updateShop = createAction(UPDATE_SHOP, 'shop');
export const updateBrand = createAction(UPDATE_BRAND, 'brand');
export const updateAddress = createAction(UPDATE_ADDRESS, 'address');
export const updateArea = createAction(UPDATE_AREA, 'area');
export const updateDecorateDate = createAction(UPDATE_DECORATE_DATE, 'decorateDate');
export const updateStatus = createAction(UPDATE_STATUS, 'status');
export const updateType = createAction(UPDATE_TYPE, 'packType');
export const updateSpaces = createAction(UPDATE_SPACES, 'spaces');
export const updateStyles = createAction(UPDATE_STYLES, 'styles');
export const updateSites = createAction(UPDATE_SITES, 'sites');
export const updateTags = createAction(UPDATE_TAGS, 'tags');

export const resetPack = createAction(RESET_PACK);

export const loadSearch = createAction(LOAD_SEARCH, 'keyword');
export const searchLoaded = createAction(LOAD_SEARCH_SUCCESS, 'searchList');
export const searchLoadingError = createAction(LOAD_SEARCH_ERROR, 'error');

export const savePack = createAction(SAVE_PACK, 'images');
export const savePackSuccess = createAction(SAVE_PACK_SUCCESS, 'serverPack');
export const savePackError = createAction(SAVE_PACK_ERROR, 'error');

export const loadUploadToken = createAction(LOAD_UPLOAD_TOKEN);
export const loadUploadTokenSuccess = createAction(LOAD_UPLOAD_TOKEN_SUCCESS, 'token');
export const loadUploadTokenError = createAction(LOAD_UPLOAD_TOKEN_ERROR, 'error');

export const loadPack = createAction(LOAD_PACK, 'id');
export const loadPackSuccess = createAction(LOAD_PACK_SUCCESS);
export const loadPackError = createAction(LOAD_PACK_ERROR, 'error');

