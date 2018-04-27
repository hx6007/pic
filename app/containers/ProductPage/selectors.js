import { createSelector } from 'reselect';
import Parser from "../../utils/urlParamParser";

const selectRoute = (state) => state.get('route');

/**
 * Direct selector to the productPage state domain
 */
const selectProductPageDomain = (state) => state.get('productPage');

/**
 * Other specific selectors
 */

const makeSelectPackInfo = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.get('packInfo')
);
const makeSelectSeriesInfo = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.get('seriesInfo')
);
const makeSelectRelationInfo = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.get('relationInfo')
);
const makeSelectLoading = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.get('loading')
);
const makeSelectError = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.get('error')
);

/**
 * Default selector used by ProductPage
 */

const makeSelectProductPage = () => createSelector(
  selectProductPageDomain,
  (substate) => substate.toJS()
);

const makeSelectProductId = () => createSelector(
  selectRoute,
  (routeState) => {
    const params = new Parser(routeState.getIn(['location', 'search']));
    return params.get('productid');
  }
);

export default makeSelectProductPage;
export {
  makeSelectPackInfo,
  makeSelectSeriesInfo,
  makeSelectRelationInfo,
  makeSelectError,
  makeSelectLoading,
  makeSelectProductId,
  selectProductPageDomain,
};
