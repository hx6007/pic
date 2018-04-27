/* eslint-disable react/sort-comp,consistent-return,react/prop-types,no-unused-expressions */
/**
 *
 * Mobile
 *
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMobile from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout/index';
import Logo from '../../components/Logo/index';
import Mfooter from '../../components/Mfooter/index';
import MobileHome from '../MobileHome/Loadable';
import MobilePageList from '../MobilePageList/Loadable';
import { changeTYpe } from './actions';
import MproductPage from '../MproductPage/Loadable';
import MuserPage from '../MuserPage/Loadable';
import Mlogin from '../Mlogin/Loadable';
import Mlabelpage from '../Mlabelpage/Loadable';
import Mlabellist from '../Mlabellist/Loadable';
import Mmymsg from '../Mmymsg/Loadable';
import Muploadlist from '../Muploadlist/Loadable';
import HtmlTitle from '../../components/HtmlTitle';
import ArticleList from '../ArticleList/Loadable';
import ArticlePage from '../ArticlePage/Loadable';
import Articlerelation from '../Articlerelation/Loadable';

const TopDiv = styled(HorizontalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;
export class Mobile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.getType(props);
  }
  componentWillReceiveProps(nexProps) {
    if (nexProps.location !== this.props.location) { // 当列表参数改变时重新加载当前页
      this.getType(nexProps);
    }
  }
  changeType(e) {
    const { dispatch } = this.props;
    dispatch(changeTYpe(e));
  }
  getType(props) {
    const { dispatch, location } = props;
    const path = location.pathname;
    let type;
    if (path.startsWith('/mobile/pageList')) {
      type = 1;
      return dispatch(changeTYpe(type));
    }
    if (path.startsWith('/mobile/articlelist')) {
      type = 2;
      return dispatch(changeTYpe(type));
    }
    if (path.startsWith('/mobile/user') || path.startsWith('/mobile/login') || path.startsWith('/mobile/msg') || path.startsWith('/mobile/muploadlist')) {
      type = 3;
      return dispatch(changeTYpe(type));
    }
    if (path.startsWith('/mobile/tags') || path.startsWith('/mobile/labelist')) {
      type = -1;
      return dispatch(changeTYpe(type));
    }
    if (path.startsWith('/mobile')) {
      type = 0;
      return dispatch(changeTYpe(type));
    }
  }
  render() {
// eslint-disable-next-line react/prop-types
    const { mobile, location } = this.props;
    const { footertype } = mobile;
    return (
      <VerticalLayout background="#fff" minHeight="100vh">
        <HtmlTitle></HtmlTitle>
        { !location.pathname.startsWith('/mobile/productpage') && !location.pathname.startsWith('/mobile/user') && !location.pathname.startsWith('/mobile/tags') && !location.pathname.startsWith('/mobile/msg') && !location.pathname.startsWith('/mobile/muploadlist') &&
        !location.pathname.startsWith('/mobile/articlelist') && !location.pathname.startsWith('/mobile/articlepage') && !location.pathname.startsWith('/mobile/articlerelation') &&
        <div><TopDiv alignItems="center" justify="center" width="100%" height="44px" background="#fff">
          <Logo width="54px" />
        </TopDiv>
          <VerticalLayout width="100%" height="44px" background="#fff"></VerticalLayout></div>}
        <Switch>
          <Route path="/mobile/pageList" component={MobilePageList} />
          <Route path="/mobile/productpage" component={MproductPage} />
          <Route path="/mobile/user" component={MuserPage} />
          <Route path="/mobile/msg" component={Mmymsg} />
          <Route path="/mobile/muploadlist" component={Muploadlist} />
          <Route path="/mobile/login" component={Mlogin} />
          <Route path="/mobile/labelist" component={Mlabellist} />
          <Route path="/mobile/tags" component={Mlabelpage} />
          <Route path="/mobile/articlelist" component={ArticleList} />
          <Route path="/mobile/articlepage" component={ArticlePage} />
          <Route path="/mobile/articlerelation" component={Articlerelation} />
          <Route component={MobileHome} />
        </Switch>
        { !location.pathname.startsWith('/mobile/productpage') && !location.pathname.startsWith('/mobile/articlepage') && !location.pathname.startsWith('/mobile/articlerelation') && <Mfooter changeType={(e) => { this.changeType(e); }} ftype={footertype} /> }
      </VerticalLayout>
    );
  }
}

Mobile.propTypes = {
  dispatch: PropTypes.func,
  mobile: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  mobile: makeSelectMobile(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mobile', reducer });
const withSaga = injectSaga({ key: 'mobile', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Mobile);
