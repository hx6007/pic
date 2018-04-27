import { createSelector } from 'reselect';

/**
 * Direct selector to the mobile state domain
 */
const selectMobileDomain = (state) => state.get('mobile');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mobile
 */

const makeSelectMobile = () => createSelector(
  selectMobileDomain,
  (substate) => substate.toJS()
);

export default makeSelectMobile;
export {
  selectMobileDomain,
};
