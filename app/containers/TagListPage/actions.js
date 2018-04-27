/*
 *
 * SeriesPage actions
 *
 */

import {
  LOAD_TAGS, LOAD_TAGS_SUCCESS, LOAD_TAGS_ERROR, DEL_TAG,
} from './constants';
import { createAction } from '../../utils/actionCreator';


export const loadTags = createAction(LOAD_TAGS, 'pageSize', 'pageNo', 'keyword');
export const loadTagsSuccess = createAction(LOAD_TAGS_SUCCESS, 'tags', 'count');
export const loadTagsFailed = createAction(LOAD_TAGS_ERROR, 'error');
export const delTag = createAction(DEL_TAG, 'tagId');
