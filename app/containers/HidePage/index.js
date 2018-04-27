/**
 *
 * HidePage
 *
 */

import React from 'react';
import { isMobileOnly } from 'react-device-detect';
import { Redirect, withRouter } from 'react-router-dom';

function HidePage({ location }) {
  if (isMobileOnly) {
    const pathname = location.pathname;
    const myLocationList = {
      pathname: '/mobile/pageList',
      search: location.search,
    };
    const myLocationDetail = {
      pathname: '/mobile/productpage',
      search: location.search,
    };
    const myLocationLabel = {
      pathname: '/mobile/labelist',
      search: `id=${pathname.substr(6)}`,
    };
    if (pathname.startsWith('/products')) {
      return <Redirect to={myLocationList} />;
    }
    if (pathname.startsWith('/product')) {
      return <Redirect to={myLocationDetail} />;
    }
    if (pathname.startsWith('/tags/')) {
      return <Redirect to={myLocationLabel} />;
    }
    if (pathname.startsWith('/tags')) {
      return <Redirect to={'/mobile/tags'} />;
    }
    if (!pathname.startsWith('/mobile')) {
      return <Redirect to={'/mobile'} />;
    }
  } else {
    const pathname = location.pathname;
    const myLocationList = {
      pathname: '/products',
      search: location.search,
    };
    const myLocationDetail = {
      pathname: '/product',
      search: location.search,
    };
    const myLocationLabel = {
      pathname: `/tags/${location.search.substr(4)}`,
      search: '',
    };
    if (pathname.startsWith('/mobile/pageList')) {
      return <Redirect to={myLocationList} />;
    }
    if (pathname.startsWith('/mobile/productpage')) {
      return <Redirect to={myLocationDetail} />;
    }
    if (pathname.startsWith('/mobile/labelist')) {
      return <Redirect to={myLocationLabel} />;
    }
    if (pathname.startsWith('/mobile/tags')) {
      return <Redirect to={'/tags'} />;
    }
    if (pathname.startsWith('/mobile')) {
      return <Redirect to={'/'} />;
    }
  }
  return null;
}

export default withRouter(HidePage);
