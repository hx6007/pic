/**
 *
 * Mmymsg
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Icon, NavBar } from 'antd-mobile';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMmymsg from './selectors';
import reducer from './reducer';
import saga from './saga';
import { VerticalLayout, HorizontalLayout } from '../../components/Layout';
import { makeSelectLoginApp } from '../App/selectors';
import { loadingData } from './actions';

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;



export class Mmymsg extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.dispatch(loadingData());
  }
  render() {
    const { mmymsg } = this.props;
    const { userData } = mmymsg;
    const mobile = userData ? userData.mobile : '';
    const name =  userData ? userData.name : '';
    const sex =  userData ? userData.sex : '';
    return (
      <VerticalLayout width="100%">
        <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
          <NavBar
            mode="light"
            icon={<Icon type="left" color="#000" />}
            onLeftClick={() => {
              this.props.history.goBack();
            }}
          >我的资料</NavBar>
        </VerticalLayoutTop>
        <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
        <VerticalLayout width="100%" padding="0 0 0 20px">
          <HorizontalLayout width="100%" borderBottom="1px solid #f5f5f5" height="52px" alignItems="center" justify="space-between">
            <HorizontalLayout fontSize="15px" color="#9B9B9B">
              昵称
            </HorizontalLayout>
            <HorizontalLayout fontSize="15px" color="#000" margin="0 20px 0 0">
              { name }
            </HorizontalLayout>
          </HorizontalLayout>

          <HorizontalLayout width="100%" borderBottom="1px solid #f5f5f5" height="52px" alignItems="center" justify="space-between">
            <HorizontalLayout fontSize="15px" color="#9B9B9B">
              性别
            </HorizontalLayout>
            <HorizontalLayout fontSize="15px" color="#000" margin="0 20px 0 0">
              { sex }
            </HorizontalLayout>
          </HorizontalLayout>
          <HorizontalLayout width="100%" borderBottom="1px solid #f5f5f5" height="52px" alignItems="center" justify="space-between">
            <HorizontalLayout fontSize="15px" color="#9B9B9B">
              手机
            </HorizontalLayout>
            <HorizontalLayout fontSize="15px" color="#000" margin="0 20px 0 0" >
              {mobile}
            </HorizontalLayout>
          </HorizontalLayout>
        </VerticalLayout>
      </VerticalLayout>
    );
  }
}

Mmymsg.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appData: makeSelectLoginApp(),
  mmymsg: makeSelectMmymsg(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mmymsg', reducer });
const withSaga = injectSaga({ key: 'mmymsg', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Mmymsg);
