import { createSelector } from 'reselect';

/**
 * Direct selector to the seriesPage state domain
 */
const selectSeriesPageDomain = (state) => state.get('seriesPage');

/**
 * Other specific selectors
 */
const makeSelectTags = () => createSelector(
  selectSeriesPageDomain,
  (substate) => (substate.get('tags') || [])
);

/**
 * Default selector used by SeriesPage
 */

const makeSelectSeriesPage = () => createSelector(
  selectSeriesPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSeriesPage;
export {
  selectSeriesPageDomain,
  makeSelectTags,
};
