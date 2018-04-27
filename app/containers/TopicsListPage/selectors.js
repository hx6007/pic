import { createSelector } from 'reselect';

/**
 * Direct selector to the topicsListPage state domain
 */
const selectTopicsListPageDomain = (state) => state.get('topicsListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TopicsListPage
 */

const makeSelectTopicsListPage = () => createSelector(
  selectTopicsListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectTopicsListPage;
export {
  selectTopicsListPageDomain,
};
