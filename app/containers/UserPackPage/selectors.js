import { createSelector } from 'reselect';

/**
 * Direct selector to the userPackPage state domain
 */
const selectUserPackPageDomain = (state) => state.get('userPackPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserPackPage
 */

const makeSelectUserPackPage = () => createSelector(
  selectUserPackPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectUserPackPage;
export {
  selectUserPackPageDomain,
};
