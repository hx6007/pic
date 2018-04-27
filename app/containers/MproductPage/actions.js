/*
 *
 * MproductPage actions
 *
 */

import {
  DEFAULT_ACTION, LOAD_PACK_INFO, LOAD_PACK_INFO_SUCCESS, LOAD_PACK_INFO_ERROR,
  LOAD_SERIES_INFO, LOAD_SERIES_INFO_SUCCESS, LOAD_SERIES_INFO_ERROR,
  LOAD_RELATION_INFO, LOAD_RELATION_INFO_SUCCESS, LOAD_RELATION_INFO_ERROR,
} from './constants';
import { createAction } from '../../utils/actionCreator';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const loadPackInfo = (packId, isProduct) => ({
  type: LOAD_PACK_INFO,
  packId,
  isProduct,
});

export const packInfoLoaded = createAction(LOAD_PACK_INFO_SUCCESS, 'packInfo');
export const packInfoLoadingError = createAction(LOAD_PACK_INFO_ERROR, 'error');

export const loadSeriesInfo = createAction(LOAD_SERIES_INFO, 'seriesName');
export const seriesInfoLoaded = createAction(LOAD_SERIES_INFO_SUCCESS, 'seriesInfo');
export const seriesInfoLoadingError = createAction(LOAD_SERIES_INFO_ERROR, 'error');

export const loadRelationInfo = createAction(LOAD_RELATION_INFO, 'packId');
export const relationInfoLoaded = createAction(LOAD_RELATION_INFO_SUCCESS, 'relationInfo');
export const relationInfoLoadingError = createAction(LOAD_RELATION_INFO_ERROR, 'error');
