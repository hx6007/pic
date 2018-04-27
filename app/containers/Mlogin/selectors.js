import { createSelector } from 'reselect';
import {selectLoginTagDomain} from "../LoginTag/selectors";

/**
 * Direct selector to the mlogin state domain
 */
const selectMloginDomain = (state) => state.get('mlogin');

/**
 * Other specific selectors
 */
const makeSelectLoading = () => createSelector(
  selectMloginDomain,
  (substate) => substate.get('loading')
);

/**
 * Default selector used by Mlogin
 */

const makeSelectMlogin = () => createSelector(
  selectMloginDomain,
  (substate) => substate.toJS()
);

export default makeSelectMlogin;
export {
  makeSelectLoading,
};
