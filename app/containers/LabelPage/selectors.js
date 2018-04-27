import { createSelector } from 'reselect';

/**
 * Direct selector to the label state domain
 */
const selectLabelDomain = (state) => state.get('label');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LabelPage
 */

const makeSelectLabel = () => createSelector(
  selectLabelDomain,
  (substate) => substate.toJS()
);

export default makeSelectLabel;
export {
  selectLabelDomain,
};
