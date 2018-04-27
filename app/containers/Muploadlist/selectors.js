import { createSelector } from 'reselect';

/**
 * Direct selector to the muploadlist state domain
 */
const selectMuploadlistDomain = (state) => state.get('muploadlist');

/**
 * Other specific selectors
 */

const makeStatus = () => createSelector(
  selectMuploadlistDomain,
  (substate) => substate.get('status')
);
/**
 * Default selector used by Muploadlist
 */

const makeSelectMuploadlist = () => createSelector(
  selectMuploadlistDomain,
  (substate) => substate.toJS()
);

export default makeSelectMuploadlist;
export {
  selectMuploadlistDomain,
  makeStatus,
};
