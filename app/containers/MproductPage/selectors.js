import { createSelector } from 'reselect';

/**
 * Direct selector to the mproductPage state domain
 */
const selectMproductPageDomain = (state) => state.get('mproductPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MproductPage
 */

const makeSelectMproductPage = () => createSelector(
  selectMproductPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectMproductPage;
export {
  selectMproductPageDomain,
};
