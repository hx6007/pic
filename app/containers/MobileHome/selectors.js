import { createSelector } from 'reselect';

/**
 * Direct selector to the mobileHome state domain
 */
const selectMobileHomeDomain = (state) => state.get('mobileHome');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MobileHome
 */

const makeSelectMobileHome = () => createSelector(
  selectMobileHomeDomain,
  (substate) => substate.toJS()
);

export default makeSelectMobileHome;
export {
  selectMobileHomeDomain,
};
