import { createSelector } from 'reselect';

/**
 * Direct selector to the packListPage state domain
 */
const selectPackListPageDomain = (state) => state.get('packListPage');
/**
 * Other specific selectors
 */

/**
 * Default selector used by PackListPage
 */

const makeSelectPackListPage = () => createSelector(
  selectPackListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPackListPage;
export {
  selectPackListPageDomain,
};
