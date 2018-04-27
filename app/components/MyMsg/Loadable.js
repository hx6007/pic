/**
 *
 * Asynchronously loads the component for MyMsg
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
