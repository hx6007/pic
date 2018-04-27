import { createSelector } from 'reselect';

/**
 * Direct selector to the seriesEditPage state domain
 */
const selectSeriesEditPageDomain = (state) => state.get('seriesEditPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SeriesEditPage
 */

const makeSelectSeriesEditPage = () => createSelector(
  selectSeriesEditPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSeriesEditPage;
export {
  selectSeriesEditPageDomain,
};
