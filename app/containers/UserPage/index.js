/* eslint-disable import/no-duplicates,react/prop-types,no-alert,consistent-return */
/**
 *
 * UserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Icon } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, Layout, VerticalLayout } from '../../components/Layout';
import Bread from '../../components/Bread';
import MenuLink from './MenuLink';
import PersonCard from '../../components/PersonCard/index';
// import MyMsg from '../../components/MyMsg/index';
// import Collect from '../../components/Collect/index';
// import Footprint from '../../components/Footprint/index';
import { makeSelectLoginApp } from '../App/selectors';
import { loadingData } from './actions';
import { FlexBody } from '../../components/Layout/index';

import UploadEffectDiagramPage from '../UploadEffectDiagramPage/Loadable';
import EffectDiagramListPage from '../EffectDiagramListPage/Loadable';
import HtmlTitle from "../../components/HtmlTitle";

const MenuBox = styled(VerticalLayout)`
  width:220px;
  background:white;
  align-items:stretch;
  padding:30px 0 0;
  min-height:575px;
   @media (max-width: 1200px) {
    width: 150px;
  }
  @media (max-width: 980px) {
    width: 120px;
  }
`;

export class UserPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }
  render() {
    if (!this.props.appData.ttoken) {
      alert('请登录!');
      window.location.href = '/';
      return;
    }
    const { userpage } = this.props;
    return (
      <VerticalLayout minWidth="750px" alignItems="stretch" background="#f4f4f4" minHeight="90vh">
        <HtmlTitle></HtmlTitle>
        { userpage.loading && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载中...'}</HorizontalLayout> }
        { userpage.error && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载出错...稍后重试哦！'}</HorizontalLayout> }
        { !userpage.loading && !userpage.error &&
          <div>
            <HorizontalLayout background="#3E82F7" height="50px">
              <FlexBody><HorizontalLayout color="white" fontSize="14px">会员中心</HorizontalLayout></FlexBody>
            </HorizontalLayout>
            <FlexBody >
              <Bread first="0" />
              <HorizontalLayout alignItems="stretch" background="#f4f4f4">
                <MenuBox >
                  <MenuLink to="/user"><Icon type="home" />会员中心</MenuLink>
                  {/* <MenuLink to="/user/profile"><Icon type="user" />我的资料</MenuLink>*/}
                  {/* <MenuLink to="/user/collect"><Icon type="heart-o" />我的收藏</MenuLink>*/}
                  {/* <MenuLink to="/user/history"><Icon type="clock-circle-o" />我的足迹</MenuLink> */}
                  <MenuLink to="/user/uploadlist"><Icon type="cloud-upload" />上传效果图</MenuLink>
                </MenuBox>
                <Layout flex="1" margin="0 0 0 15px" background="#f4f4f4" minHeight="575px" >
                  <Switch>
                    {/* <Route  path="/user/profile" component={MyMsg}/>*/}
                    {/* <Route  path="/user/collect" component={Collect}/>*/}
                    {/* <Route  path="/user/history" component={Footprint}/>*/}
                    <Route exact path="/user" component={PersonCard} />
                    <Route exact path="/user/uploadlist" component={EffectDiagramListPage} />
                    <Route exact path="/user/upload/:id" component={UploadEffectDiagramPage} />
                    <Route exact path="/user/upload" component={UploadEffectDiagramPage} />
                  </Switch>
                </Layout>

              </HorizontalLayout>
            </FlexBody>
          </div>
        }
      </VerticalLayout>
    );
  }
}

UserPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  getData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userpage: makeSelectUserPage(),
  appData: makeSelectLoginApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getData: (token, userid) => dispatch(loadingData(token, userid)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userPage', reducer });
const withSaga = injectSaga({ key: 'userPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPage);
