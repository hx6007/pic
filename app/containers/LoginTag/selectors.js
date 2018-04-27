import { createSelector } from 'reselect';
import {selectAdminLoginPageDomain} from "../AdminLoginPage/selectors";

/**
 * Direct selector to the loginTag state domain
 */
const selectLoginTagDomain = (state) => state.get('loginTag');

/**
 * Other specific selectors
 */
const makeSelectLoading = () => createSelector(
  selectLoginTagDomain,
  (substate) => substate.get('loading')
);

/**
 * Default selector used by LoginTag
 */

const makeSelectLoginTag = () => createSelector(
  selectLoginTagDomain,
  (substate) => substate.toJS()
);

export default makeSelectLoginTag;
export {
  selectLoginTagDomain,
  makeSelectLoading,
};
