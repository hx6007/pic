import { createSelector } from 'reselect';

/**
 * Direct selector to the topicsPage state domain
 */
const selectTopicsPageDomain = (state) => state.get('topicsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopicsPage
 */

const makeSelectTopicsPage = () => createSelector(
  selectTopicsPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectTopicsPage;
export {
  selectTopicsPageDomain,
};
