import { createSelector } from 'reselect';

/**
 * Direct selector to the articleList state domain
 */
const selectArticleListDomain = (state) => state.get('articleList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ArticleList
 */

const makeSelectArticleList = () => createSelector(
  selectArticleListDomain,
  (substate) => substate.toJS()
);

export default makeSelectArticleList;
export {
  selectArticleListDomain,
};
