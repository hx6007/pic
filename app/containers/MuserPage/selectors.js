import { createSelector } from 'reselect';

/**
 * Direct selector to the muserPage state domain
 */
const selectMuserPageDomain = (state) => state.get('muserPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MuserPage
 */

const makeSelectMuserPage = () => createSelector(
  selectMuserPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectMuserPage;
export {
  selectMuserPageDomain,
};
