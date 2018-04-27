import { createSelector } from 'reselect';

/**
 * Direct selector to the effectDiagramListPage state domain
 */
const selectEffectDiagramListPageDomain = (state) => state.get('effectDiagramListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EffectDiagramListPage
 */

const makeSelectEffectDiagramListPage = () => createSelector(
  selectEffectDiagramListPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectEffectDiagramListPage;
export {
  selectEffectDiagramListPageDomain,
};
