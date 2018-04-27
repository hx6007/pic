/**
 *
 * MuserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavBar, Modal } from 'antd-mobile';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { tlogout } from '../App/actions';
import makeSelectMuserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import { makeSelectLoginApp } from '../App/selectors';
import userbg from './Mask@2x.png';
import userIcon from './my.png';
import last from './Rectangle44@2x.png';
import HomeP from '../../containers/MobileHome/HomeProduct.png';
import HomeE from '../../containers/MobileHome/HomeEffect.png';
import Upimg from './upimg.png';
import Upimgb from './upingb.png';
import { loadingData } from './actions';
import imgCode from '../../containers/HeaderPage/code.jpg';


const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const HorizontalLayoutu = styled(HorizontalLayout)`
  position: relative;
`;
const UserTopimg = styled(HorizontalLayout)`
  width: 100%;
  height: 120px;
  img{
    width: 100%;
  }
`;
const UserTop = styled(HorizontalLayout)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  padding:0 30px;
  justify-content: space-between;
`;
const Out = styled(HorizontalLayout)`
  border: 1px solid #fff;
`;
const UserIcon = styled(HorizontalLayout)`
  width: 18px;
  height: 18px;
  margin-right: 10px;
  img{
    width: 18px;
    height: 18px;
  }
`;
const Last = styled(HorizontalLayout)`
  width: 24px;
  height: 24px;
  img{
    width: 24px;
    height: 24px;
  }
`;
const VerticalLayoutA = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HorizontalLayoutLink = styled(Link)`
  display:flex;
  flex-direction:row;
  width:100%;
  border-bottom:1px solid #f5f5f5;
  height:52px;
  padding:0 20px;
  align-items: center;
  justify-content: space-between;
`;

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}


export class MuserPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
    };
  }
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  componentDidMount() {
    this.props.dispatch(loadingData());
  }
  exit() {
    this.props.dispatch(tlogout());
  }

  render() {
    const { appData, muserpage } = this.props;
    const { userData } = muserpage;
    const { ttoken } = appData;
    if (!ttoken) {
      return <Redirect to="/mobile/login" />;
    }
    return (
      <VerticalLayout width="100%" background="#F5F5F5">
        <VerticalLayoutTop width="100%" background="#ffffff" color="#000">
          <NavBar
            mode="light"
            onLeftClick={() => { this.props.history.goBack(); }}
          >我的</NavBar>
        </VerticalLayoutTop>
        <HorizontalLayout height="45px"></HorizontalLayout>
        <HorizontalLayoutu width="100%" height="120px" alignItems="center" justify="center">
          <UserTopimg>
            <img src={userbg} alt="" />
          </UserTopimg>
          <UserTop>
            <HorizontalLayout>
              <VerticalLayout width="62px" height="62px" margin="0 20px 0 0" background="#fff" borderRadius="50%"></VerticalLayout>
              <VerticalLayout>
                <HorizontalLayout fontSize="15px" color="#fff">{ userData.username || '无' }</HorizontalLayout>
                <HorizontalLayout fontSize="13px" color="#fff">{ userData.customer_grade || '普通会员' }</HorizontalLayout>
              </VerticalLayout>
            </HorizontalLayout>
            <Out fontSize="13px" color="#fff" padding="5px 20px" borderRadius="16px" onClick={() => { this.exit(); }}>退出</Out>
          </UserTop>
        </HorizontalLayoutu>
        <HorizontalLayout width="100%" height="110px" alignItems="center" justify="center" background="#ffffff">
          <VerticalLayoutA to={'/mobile/pageList?type=1'}>
            <HorizontalLayout width="30px" height="30px" margin="0 0 10px 0">
              <img src={HomeP} alt="" width="30px" height="30px" />
            </HorizontalLayout>
            <HorizontalLayout fontSize="13px" color="#777777">产品图</HorizontalLayout>
          </VerticalLayoutA>
          <VerticalLayoutA to={'/mobile/pageList?type=3'}>
            <HorizontalLayout width="30px" height="30px" margin="0 0 10px 0">
              <img src={HomeE} alt="" width="30px" height="30px" />
            </HorizontalLayout>
            <HorizontalLayout fontSize="13px" color="#777777">效果图</HorizontalLayout>
          </VerticalLayoutA>
          <VerticalLayout flex="1" alignItems="center" justify="center" onClick={this.showModal('modal1')}>
            <HorizontalLayout width="30px" height="30px" margin="0 0 10px 0">
              <img src={Upimgb} alt="" width="30px" height="30px" />
            </HorizontalLayout>
            <HorizontalLayout fontSize="13px" color="#777777">上传图片</HorizontalLayout>
          </VerticalLayout>
        </HorizontalLayout>
        <VerticalLayout width="100%" background="#fff" margin="10px 0 0 0">
          <HorizontalLayoutLink to={'/mobile/msg'} >
            <HorizontalLayout fontSize="15px" color="#000">
              <UserIcon>
                <img src={userIcon} alt="" />
              </UserIcon>
              我的资料
            </HorizontalLayout>
            <Last><img src={last} alt="" /></Last>
          </HorizontalLayoutLink>
          <HorizontalLayoutLink to={'/mobile/muploadlist'} >
            <HorizontalLayout fontSize="15px" color="#000">
              <UserIcon>
                <img src={Upimg} alt="" />
              </UserIcon>
              我的上传图
            </HorizontalLayout>
            <Last><img src={last} alt="" /></Last>
          </HorizontalLayoutLink>
        </VerticalLayout>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="温馨提示"
          footer={[{ text: '知道了', onPress: () => { this.onClose('modal1')(); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <VerticalLayout height="200px" alignItems="center" justify="center" fontSize='13px'>
            <img src={imgCode} alt="" style={{ height: 150, width: 150 }} />
            请在微信小程序里搜索“千图万图”或者进入PC版进行上传图操作
          </VerticalLayout>
        </Modal>
      </VerticalLayout>
    );
  }
}

MuserPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  muserpage: makeSelectMuserPage(),
  appData: makeSelectLoginApp(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'muserPage', reducer });
const withSaga = injectSaga({ key: 'muserPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MuserPage);
