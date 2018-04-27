/**
 *
 * Asynchronously loads the component for PackEditPage
 *
 */

import Loadable from 'react-loadable';
import PageLoader from '../../components/PageLoader';

export default Loadable({
  loader: () => import('./index'),
  loading: PageLoader,
});
