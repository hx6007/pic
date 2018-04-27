import { createSelector } from 'reselect';

/**
 * Direct selector to the adminUserPage state domain
 */
const selectAdminUserPageDomain = (state) => state.get('adminUserPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AdminUserPage
 */

const makeSelectAdminUserPage = () => createSelector(
  selectAdminUserPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminUserPage;
export {
  selectAdminUserPageDomain,
};
