import { createSelector } from 'reselect';

/**
 * Direct selector to the labelProductPage state domain
 */
const selectLabelProductPageDomain = (state) => state.get('labelProductPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LabelProductPage
 */

const makeSelectLabelProductPage = () => createSelector(
  selectLabelProductPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectLabelProductPage;
export {
  // selectLabelProductPageDomain,
};
