/**
 *
 * LoginTag
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginTag, {makeSelectLoading} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, Layout, VerticalLayout } from '../../components/Layout/index';
import NormalLoginForm from '../../components/NormalLoginForm/index';
import { makeSelectLoginApp } from '../App/selectors';
import { hideLoginForm, tlogin } from '../App/actions';

const LoginRegisterDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  left: 0px;
  background:rgba(0,0,0,0.5);
  z-index: 30;
`;

const MainView = styled(Layout)`
  width: 400px;
  height: 420px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
`;

const MainBox = styled(VerticalLayout)`
  width:400px;
  height:420px; 
  background:rgba(255,255,255,1);
`;

const TopDiv = styled(Layout)`
  display: flex;
  width: 400px;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size:16px;
  font-family:MicrosoftYaHei;
`;

export class LoginTag extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { applogin, dispatch, loading } = this.props;
    const { isShowLoginForm } = applogin;
    if (!isShowLoginForm) return null;
    return (
      <div>
        <LoginRegisterDiv onClick={() => dispatch(hideLoginForm())}></LoginRegisterDiv>
        <MainView>
          <MainBox>
            <HorizontalLayout justify="space-between">
              <TopDiv background="#fff" color="#575757">登录</TopDiv>
            </HorizontalLayout>
            <Layout display="flex" justify="center" width="100%">
              <VerticalLayout width="322px" height="250px" margin="60px auto" border="2px solid red">
                <NormalLoginForm login={(username, password) => dispatch(tlogin(username, password))} loading={loading} />
              </VerticalLayout>
            </Layout>
          </MainBox>
        </MainView>
      </div>
    );
  }
}

LoginTag.propTypes = {
  dispatch: PropTypes.func,
  applogin: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  logintag: makeSelectLoginTag(),
  applogin: makeSelectLoginApp(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginTag', reducer });
const withSaga = injectSaga({ key: 'loginTag', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginTag);
