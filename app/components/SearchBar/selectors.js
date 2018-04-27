import { createSelector } from 'reselect';

const selectSearchBarDomain = (state) => state.get('searchBar');

const makeSelectSearchBar = () => createSelector(
  selectSearchBarDomain,
  (substate) => substate.toJS()
);


export default makeSelectSearchBar;
export {
};
