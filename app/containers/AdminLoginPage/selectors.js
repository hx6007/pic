import { createSelector } from 'reselect';

/**
 * Direct selector to the adminLoginPage state domain
 */
const selectAdminLoginPageDomain = (state) => state.get('adminLoginPage');

/**
 * Other specific selectors
 */
const makeSelectError = () => createSelector(
  selectAdminLoginPageDomain,
  (substate) => substate.get('error')
);
const makeSelectLoading = () => createSelector(
  selectAdminLoginPageDomain,
  (substate) => substate.get('loading')
);

/**
 * Default selector used by AdminLoginPage
 */

const makeSelectAdminLoginPage = () => createSelector(
  selectAdminLoginPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectAdminLoginPage;
export {
  selectAdminLoginPageDomain,
  makeSelectError,
  makeSelectLoading,
};
