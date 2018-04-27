/*
 *
 * Mobile actions
 *
 */

import {
  CHANGE_TYPESUCCESS,
  DEFAULT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const changeTYpe = (footertype) => ({
  type: CHANGE_TYPESUCCESS,
  footertype,
});
