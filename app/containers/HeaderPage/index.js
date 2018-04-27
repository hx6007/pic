/**
 *
 * HeaderPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLoginApp } from '../App/selectors';
import { showLoginForm, tlogout } from '../App/actions';
import makeSelectHeaderPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { FlexBody, HorizontalLayout, Layout } from '../../components/Layout/index';
import SearchBar from '../../components/SearchBar';
import Logo from '../../components/Logo';
import imgCode from './code.jpg';
import user from './user.png';


const Dive = styled.div `
  display: flex;
  min-width: 750px;
  height: 80px;
  border:1px solid transparent;
  background: #fff;
  box-shadow:0 0 6px 1px rgba(0,0,0,0.1);
`;
const SpanBox = styled(HorizontalLayout)`
  position: relative;
`;
const MySpan = styled.span`
  margin-right: 2em; 
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: rgba(21,21,21,1);
  cursor: pointer;
  @media (max-width: 1200px){
    margin-right: 1em; 
  }
`;
const TinySpan = styled.span`
  padding-left: 6px;
  vertical-align: middle;
`;
const TinySpanA = styled(Link)`
  font-size: 13px;
  font-family: MicrosoftYaHei;
  color: rgba(21,21,21,1);
  cursor: pointer;
  &:hover{
  color: rgba(21,21,21,1);
  }
`;
const Code = styled.img`
  width: 154px;
  height: 154px;
  position: absolute;
  left: -77px;
  top: 23px;
  z-index: 20;
  box-shadow: 0px 0px 4px 0px rgba(170, 170, 170, 1);
  padding: 10px;
  background: #FFFFFF;
`;
const Span = styled.span`
  margin-right: 15px;
`;

export class HeaderPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.state = {
      shouldShowCode: false, // 显示二维码
      shouldShowDiv: false, // 显示登录图层
    };
  }
  changeVisibility(which, shouldShow) {
    this.setState({
      [which]: shouldShow,
    });
  }
  changeVisibilityTwo() {
    this.setState({
      shouldShowDiv: !this.state.shouldShowDiv,
    });
  }
  exit() {
    this.props.dispatch(tlogout());
  }
  render() {
    const { appData, dispatch, location } = this.props;
    const showBtn = location.pathname !== '/';
    return (
      <Dive>
        <FlexBody>
          <HorizontalLayout margin="20px auto" >
            { showBtn && <Logo width="110px" /> }
            { showBtn && <Route component={SearchBar} /> }
            <Layout flex="1" />
            <SpanBox>
              <MySpan
                onMouseEnter={() => this.changeVisibility('shouldShowCode', true)}
                onMouseLeave={() => this.changeVisibility('shouldShowCode', false)}
              >
                <TinySpan>小程序</TinySpan>
              </MySpan>
              <MySpan><TinySpanA to={'/tags'}>产品标签库</TinySpanA></MySpan>
              <MySpan>
                <img src={user} width="20px" alt="user" />
                { appData && appData.ttoken ? (<TinySpan>
                  <Span><TinySpanA to={'/user'}>{appData.tusername}&nbsp;</TinySpanA></Span><Span onClick={() => this.exit()}>退出</Span>
                </TinySpan>) : <TinySpan onClick={() => dispatch(showLoginForm())}>登录</TinySpan>}
              </MySpan>
              {this.state.shouldShowCode && <Code src={imgCode} alt="icon" />}
            </SpanBox>
          </HorizontalLayout>
        </FlexBody>
      </Dive>
    );
  }
}

HeaderPage.propTypes = {
  appData: PropTypes.any,
  location: PropTypes.any,
// eslint-disable-next-line react/no-unused-prop-types
  headerpage: PropTypes.any,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  appData: makeSelectLoginApp(),
  headerpage: makeSelectHeaderPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'headerPage', reducer });
const withSaga = injectSaga({ key: 'headerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HeaderPage);
