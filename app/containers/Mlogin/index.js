/**
 *
 * Mlogin
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavBar } from 'antd-mobile';
import styled from 'styled-components';
import { Button } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMlogin from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import { tlogin } from '../App/actions';
import {makeSelectLoading} from "../LoginTag/selectors";

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const InputBox = styled(HorizontalLayout)`
  width: 85%;
  height: 50px;
  margin: 20px auto 0 auto;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background:rgba(255,255,255,1);
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.1);
  border-radius: 4px ; 
  input{
  flex: 1;
  font-size:15px;
  font-family:PingFangSC-Medium;
  color:#000000;
  line-height:21px;
  }
`;
const HorizontalLayoutButton  = styled(HorizontalLayout)`
  button{
    width: 100%;
    height: 100%;
  }
`;
export class Mlogin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state= {
    username: '',
    psd: '',
  };
  changeUsername(e) {
    this.setState({ username: e.target.value });
  }
  changePsd(e) {
    this.setState({ psd: e.target.value });
  }
  render() {
    const { dispatch, loading } = this.props;
    return (
      <VerticalLayout width="100%" background="#F5F5F5">
        <VerticalLayoutTop width="100%" background="#ffffff" color="#000">
          <NavBar
            mode="light"
            onLeftClick={() => { this.props.history.goBack(); }}
          >我的</NavBar>
        </VerticalLayoutTop>
        <VerticalLayout width="100%" height="100vh" background="#f5f5f5" justify="center" alignItems="center">
          <HorizontalLayout fontSize="24px" color="#CFCFCF">请先登录</HorizontalLayout>
          <InputBox>
            <input type="text" name="" value={this.state.username} onChange={(e) => { this.changeUsername(e); }} id="iphone" placeholder="用户名/手机号" />
          </InputBox>
          <InputBox>
            <input type="password" name="" value={this.state.psd} onChange={(e) => { this.changePsd(e); }} id="psd" placeholder="密码" />
          </InputBox>
          <HorizontalLayoutButton width="85%" height="50px" background="#3F83F8" color="#ffffff" fontSize="18px" alignItems="center" justify="center" margin="20px 0 0 0 " borderRadius="4px" >
            <Button type="primary" loading={loading} onClick={() => { dispatch(tlogin(this.state.username, this.state.psd)); }}>登 录</Button>
          </HorizontalLayoutButton>
          <HorizontalLayout height="150px" ></HorizontalLayout>
        </VerticalLayout>
      </VerticalLayout>
    );
  }
}

Mlogin.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mlogin: makeSelectMlogin(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mlogin', reducer });
const withSaga = injectSaga({ key: 'mlogin', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Mlogin);
