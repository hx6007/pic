import { createSelector } from 'reselect';

/**
 * Direct selector to the userPackEditPage state domain
 */
const selectUserPackEditPageDomain = (state) => state.get('userPackEditPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UserPackEditPage
 */

const makeSelectUserPackEditPage = () => createSelector(
  selectUserPackEditPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectUserPackEditPage;
export {
  selectUserPackEditPageDomain,
};
