import { createSelector } from 'reselect';

/**
 * Direct selector to the packEditPage state domain
 */
const selectPackEditPageDomain = (state) => state.get('packEditPage');
const selectRoute = (state) => state.get('route');

/**
 * Other specific selectors
 */
const makeSelectSearchList = () => createSelector(
  selectPackEditPageDomain,
  (substate) => {
    function getNotNullString(string) {
      return string || '无';
    }
    return (substate.get('searchList') || [])
    .map((item) => `${getNotNullString(item.no)} - ${getNotNullString(item.level)} - ${getNotNullString(item.series)} - ${getNotNullString(item.brand)}`);
  }
);

const makeSelectType = () => createSelector(
  selectPackEditPageDomain,
  selectRoute,
  (substate, routeState) => {
    const { state } = routeState.get('location').toJS();
    return substate.get('type') || parseInt(state && state.type, 10);
  }
);


/**
 * Default selector used by PackEditPage
 */

const makeSelectPackEditPage = () => createSelector(
  selectPackEditPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectPackEditPage;
export {
  selectPackEditPageDomain,
  makeSelectSearchList,
  makeSelectType,
};
