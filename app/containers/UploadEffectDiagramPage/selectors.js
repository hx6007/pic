import { createSelector } from 'reselect';

/**
 * Direct selector to the uploadEffectDiagramPage state domain
 */
const selectUploadEffectDiagramPageDomain = (state) => state.get('uploadEffectDiagramPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by UploadEffectDiagramPage
 */

const makeSelectUploadEffectDiagramPage = () => createSelector(
  selectUploadEffectDiagramPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectUploadEffectDiagramPage;
export {
  selectUploadEffectDiagramPageDomain,
};
