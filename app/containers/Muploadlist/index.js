/**
 *
 * Muploadlist
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { NavBar, Icon, Pagination, Modal } from 'antd-mobile';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMuploadlist, { makeStatus } from './selectors';
import { changeStatus } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUserid } from '../App/selectors';
import Image from '../../components/Image';
import { getEffectDiagramList } from '../../utils/service';
import Upimg from './upimg.png';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
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
const HorizontalLayoutTab = styled(HorizontalLayout)`
  position: fixed;
  top: 45px;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const Tabitem = styled(HorizontalLayout)`
  //flex: 1 ;
  height: 42px ;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  border-bottom: 3px solid ${(props) => props.checked ? '#3E82F7' : '#FFFFFF'};
  color: ${(props) => props.checked ? '#3E82F7' : '#4A4A4A'};
`;
const UpimgItem = styled(VerticalLayout)`
  display: flex;
  width: 46%;
  margin: 0 0 10px 10px;
  background: #ffffff;
`;
const MproductItemimg = styled(HorizontalLayout)`
  width: 100%;
  height: 180px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
   .lgfVqv{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    }
`;
const HorizontalLayoutPag = styled(HorizontalLayout)`
  width: 100%;
  .am-pagination{
  width: 100%;
  padding: 10px;
  }
  .arrow-align,,.am-pagination-wrap{
  font-size: 13px;
  }
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

export class Muploadlist extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      packs: [],
      page: 1,
      count: 0,
      limit: 20,
      skip: 0,
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
    this.getpackslist(this.props.status);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      this.getpackslist(nextProps.status);
    }
  }
  getTab(checked, tabname, thistype) {
    return (
      <HorizontalLayout flex="1" alignItems="center" justify="center">
        <Tabitem
          checked={checked}
          onClick={() => {
            this.setState({ packs: [], page: 1 });
            this.props.dispatch(changeStatus(thistype == 0 ? '' : thistype));
          }}
        >{tabname}</Tabitem>
      </HorizontalLayout>);
  }
  changestatue(status) {
    let statusCN = '';
    switch (status) {
      case 1:
        statusCN = '待发布';
        break;
      case 2:
        statusCN = '已发布';
        break;
      case 3:
      case 4:
        statusCN = '待审核';
        break;
      case 5:
        statusCN = '审核不通过';
        break;
      default:
        statusCN = '待定';
        break;
    }
    return statusCN;
  }
  changestatueColor(status) {
    let statusCo = '';
    switch (status) {
      case 1:
        statusCo = '#3E82F7';
        break;
      case 2:
        statusCo = '#67B014';
        break;
      case 3:
      case 4:
        statusCo = '#F5A623';
        break;
      case 5:
        statusCo = '#D0021B';
        break;
      default:
        statusCo = '#F5A623';
        break;
    }
    return statusCo;
  }
  getItem(packs) {
    return packs.map((item, index) => {
      const image = item.cover || item.images[0];
      const product = item.products[0] || {};
      const status = item.status || 0;
      const createdAt = item.createdAt.split('T')[0] || '';
      return (
        <UpimgItem key={index}>
          <MproductItemimg>
            <Image src={image} width="100%" maxWidth="300px" />
          </MproductItemimg>
          <HorizontalLayout width="100%" height="40px" padding="0 10px" alignItems="center" justify="space-between">
            <HorizontalLayout color={this.changestatueColor(status)} fontSize="13px">{this.changestatue(status)}</HorizontalLayout>
            <HorizontalLayout color="#BEBDBD" fontSize="13px">{createdAt}</HorizontalLayout>
          </HorizontalLayout>
        </UpimgItem>
      );
    });
  }
  getpackslist(status, skipp) {
    const { userid } = this.props;
    const { limit } = this.state;
    const skip = skipp || this.state.skip;
    getEffectDiagramList({ userid, limit, skip, status }).then((data) => {
      this.setState({
        count: data.count,
        packs: data.packs,
      });
    });
  }
  changePage(e) {
    const { limit } = this.state;
    const { status } = this.props;
    const page = e - 1;
    const skip = page * limit;
    this.setState({
      page: e,
      packs: [],
    });
    this.getpackslist(status, skip);
  }
  render() {
    const { count, packs, limit, page } = this.state;
    const { status } = this.props; // 查询数据 { 0: 所有, 1: 待发布, 2: 已发布, 3: 一审, 4: 二审, 5: 驳回 }
    const thispage = parseInt(page) || 1;
    const firststatus = status[0] || 0;
    const total = Math.ceil(count / limit);
    return (
      <VerticalLayout width="100%">
        <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
          <NavBar
            mode="light"
            icon={<Icon type="left" color="#000" />}
            onLeftClick={() => {
              this.props.history.goBack();
            }}
          >我的上传图</NavBar>
        </VerticalLayoutTop>
        <VerticalLayout width="100%" background="#FFFFFF" height="45px"></VerticalLayout>
        <HorizontalLayoutTab width="100%" background="#FFFFFF" height="45px" justify="space-between" alignItems="center">
          <HorizontalLayout flex="1" height="45px" alignItems="center">
            {this.getTab([0].includes(firststatus), '全部', [0])}
            {this.getTab([3, 4].includes(firststatus), '待审核', [3, 4])}
            {this.getTab([5].includes(firststatus), '未通过', [5])}
            {this.getTab([2].includes(firststatus), '已发布', [2])}
          </HorizontalLayout>
          <HorizontalLayout padding="0 20px" alignItems="center" justify="center" fontSize="13px" color="#4A4A4A" onClick={this.showModal('modal1')}><img
            src={Upimg} alt=""
          /><HorizontalLayout width="5px"></HorizontalLayout>上传</HorizontalLayout>
        </HorizontalLayoutTab>
        <VerticalLayout width="100%" background="#FFFFFF" height="45px"></VerticalLayout>
        <VerticalLayout width="100%" padding="20px 0 50px 0 " background="#F5F5F5">
          <HorizontalLayout width="100%" minHeight="80vh" flexWrap="wrap" justify="flex-start" alignItems="flex-start">
            {packs.length === 0 && <HorizontalLayout width="100%" fontSize="13px" alignItems="center" justify="center" padding="10px 0">暂无数据</HorizontalLayout> }
            {this.getItem(packs)}
          </HorizontalLayout>
          <HorizontalLayoutPag width="100%" >
            <Pagination
              total={total}
              className="custom-pagination-with-icon"
              current={thispage}
              locale={{
                prevText: (<span className="arrow-align">上一页</span>),
                nextText: (<span className="arrow-align">下一页</span>),
              }}
              onChange={(e) => { this.changePage(e); }}
            />
          </HorizontalLayoutPag>
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

Muploadlist.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userid: PropTypes.string,
  status: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  muploadlist: makeSelectMuploadlist(),
  userid: makeSelectUserid(),
  status: makeStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'muploadlist', reducer });
const withSaga = injectSaga({ key: 'muploadlist', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Muploadlist);
