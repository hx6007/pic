import { createSelector } from 'reselect';

/**
 * Direct selector to the mlabellist state domain
 */
const selectMlabellistDomain = (state) => state.get('mlabellist');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mlabellist
 */

const makeSelectMlabellist = () => createSelector(
  selectMlabellistDomain,
  (substate) => substate.toJS()
);

export default makeSelectMlabellist;
export {
  selectMlabellistDomain,
};
