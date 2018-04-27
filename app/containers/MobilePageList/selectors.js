import { createSelector } from 'reselect';

/**
 * Direct selector to the mobilePageList state domain
 */
const selectMobilePageListDomain = (state) => state.get('mobilePageList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MobilePageList
 */

const makeSelectMobilePageList = () => createSelector(
  selectMobilePageListDomain,
  (substate) => substate.toJS()
);

export default makeSelectMobilePageList;
export {
  selectMobilePageListDomain,
};
