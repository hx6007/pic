import { createSelector } from 'reselect';

/**
 * Direct selector to the mlabelpage state domain
 */
const selectMlabelpageDomain = (state) => state.get('mlabelpage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mlabelpage
 */

const makeSelectMlabelpage = () => createSelector(
  selectMlabelpageDomain,
  (substate) => substate.toJS()
);

export default makeSelectMlabelpage;
export {
  selectMlabelpageDomain,
};
