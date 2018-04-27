/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';

import HomePage from '../HomePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import ProductListPage from '../ProductListPage/Loadable';
import ProductPage from '../ProductPage/Loadable';
import UserPage from '../UserPage/Loadable';
import AdminPage from '../AdminPage/Loadable';
import PageFooter from '../../components/PageFooter';
import LoginTag from '../LoginTag/index';
import Label from '../LabelPage/Loadable';
import Mobile from '../Mobile/Loadable';
import HeaderPage from '../HeaderPage/Loadable';
import LabelProductPage from '../LabelProductPage/Loadable';
import HidePage from '../HidePage';
function App() {
  function shouldShowMotherBoard(location) {
    const path = location.pathname;
    const shouldHide = path.startsWith('/admin') || path.startsWith('/mobile') || isMobileOnly;
    return !shouldHide;
  }
  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <HidePage />
      <Route component={({ location }) => shouldShowMotherBoard(location) ? <HeaderPage location={location} /> : null} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={ProductListPage} />
        <Route path="/product" component={ProductPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/mobile" component={Mobile} />
        <Route path="/tags/:labelId" component={LabelProductPage} />
        <Route path="/tags" component={Label} />
        <Route component={NotFoundPage} />
      </Switch>
      <Route component={({ location }) => shouldShowMotherBoard(location) && <PageFooter />} />
      <LoginTag />

    </div>
  );
}


export default App;

