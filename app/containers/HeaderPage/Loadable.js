/**
 *
 * Asynchronously loads the component for HeaderPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
