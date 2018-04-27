/**
 *
 * AdminLoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import  {makeSelectError,makeSelectLoading} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {login as loginAction} from '../../containers/App/actions';
import {VerticalLayout} from "../../components/Layout";
import {Button, Input} from "antd";

export class AdminLoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    username:'',
    password:''
  };

  render() {
    const {username,password}=this.state;
    const {login,error,loading}=this.props;
    return (
      <VerticalLayout  alignItems="center">
        <VerticalLayout  alignItems="stretch" width="220px" margin="30px 0 0 0">
          <Input placeholder="账号" value={username} onChange={e=>this.setState({username:e.target.value})} />
          <br/>
          <Input placeholder="密码" type="password" value={password} onChange={e=>this.setState({password:e.target.value})} />
          <br/>
          <Button type="primary" onClick={e=>login(username,password)} loading={loading}>登录</Button>
          <VerticalLayout color="red">{error}</VerticalLayout>
        </VerticalLayout>
      </VerticalLayout>
    );
  }

}

AdminLoginPage.propTypes = {
  login: PropTypes.func,
  error: PropTypes.any,
  loading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    login:(u,p)=>dispatch(loginAction(u,p))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminLoginPage', reducer });
const withSaga = injectSaga({ key: 'adminLoginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminLoginPage);
