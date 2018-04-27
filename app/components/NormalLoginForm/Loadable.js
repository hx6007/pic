/**
 *
 * Asynchronously loads the component for NormalLoginForm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
