import { createSelector } from 'reselect';

/**
 * Direct selector to the headerPage state domain
 */
const selectHeaderPageDomain = (state) => state.get('headerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HeaderPage
 */

const makeSelectHeaderPage = () => createSelector(
  selectHeaderPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectHeaderPage;
export {
  selectHeaderPageDomain,
};
