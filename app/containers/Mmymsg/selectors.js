import { createSelector } from 'reselect';

/**
 * Direct selector to the mmymsg state domain
 */
const selectMmymsgDomain = (state) => state.get('mmymsg');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Mmymsg
 */

const makeSelectMmymsg = () => createSelector(
  selectMmymsgDomain,
  (substate) => substate.toJS()
);

export default makeSelectMmymsg;
export {
  selectMmymsgDomain,
};
