/**
 *
 * EffectDiagramListPage
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, Icon, Modal, Pagination, message } from 'antd';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectEffectDiagramListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectUserid } from '../App/selectors';

import { HorizontalLayout, Layout, VerticalLayout } from '../../components/Layout/index';
import { getEffectDiagramList, removeEffectDiagram } from '../../utils/service';

const ImgBox = styled.div`
height: 205px;
width: 167px;
border: 1px solid #e8e8e8;
margin: 0 5px 20px 5px;
opacity: 0.95;
:hover {
  opacity: 1;
  border: 1px solid #CCC;
  .isShow {
    visibility: visible;
  }
}
`;

const CheckMessageBox = styled.div`
height: 165px;
width: 165px;
position: relative;
top: -20px;
`;

const CheckMessage = styled.div`
width: 165px;
height: 36px;
padding: 0 5px;
color: #FFFFFF;
font-size: 12px;
background-color: #E09625;
position: relative;
bottom: 36px;
overflow: scroll;
word-wrap: break-word;
z-index: 1;
`;

const Triangle = styled.div`
width: 0;
height: 0;
border-left: 8px solid transparent;
border-right: 8px solid transparent;
border-top: 8px solid #E09625;
z-index: 1;
position: relative;
top: -36px;
left: 8px;
`;

const ImgItem = styled.img`
width: 165px;
height: 165px;
`;

const LinkBoxBtn = styled.div`
visibility: hidden;
z-index: 1;
position: relative;
width: 100%;
font-size: 12px;
color: #FFFFFF;
background-color: #5981F3;
display: flex;
justifly-contene: space-between;
`;

const LinkBtn = styled.a`
width: 100%;
height: 20px;
color: #FFFFFF;
text-align: center;
:hover {
  background-color: #6cA8fc;
  color: #FFFFFF;
}
`;

const Mess = styled.div`
position: relative;
top: -20px;
width: 100%;
height: 40px;
display: flex;
justify-content: flex-start;
flex: 1;
align-items: center;
z-index: 1;
`;

const MessIcon = styled.div`
width: 20%;
display: flex;
justify-content: center;
`;

const MessText = styled.span`
width: 40%;
font-size: 12px;
`;

const MessTime = styled.span`
width: 40%;
font-size: 12px;
`;

export class EffectDiagramListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    deletingId: -1,
    showDeleteWarning: false,
    cards: [],
    limit: 24, // 每页数量
    skip: 0, // 跳过条数
    count: 0, // 数据总条数
    current: 1, // 当前页码
    state: 0, // state 查询数据 { 0: 所有, 1: 待发布, 2: 已发布, 3: 一审, 4: 二审, 5: 驳回 }
  }

  componentDidMount() {
    this.requestCards();
  }

  onShowMessage = ({ id, checking }) => {
    if (checking === 5) {
      this.setState({ [id]: !this.state[id] });
    }
  }

  getIcon(type) {
    switch (type) {
      case 1:
        return <Icon type="check-square-o" />;
      case 2:
        return <Icon type="check-square" />;
      case 3:
      case 4:
        return <Icon type="loading-3-quarters" />;
      case 5:
        return <Icon type="exclamation-circle" />;
      default:
        return <Icon type="loading-3-quarters" />;
    }
  }

  CardList = ({ id, checking, image, title, createTime, checkMessage }) => (
    <ImgBox key={id}>
      <LinkBoxBtn className="isShow">
        <LinkBtn href={`/user/upload/${id}`} style={{ borderRight: '1px solid #FFFFFF' }}>修改</LinkBtn>
        <LinkBtn onClick={() => { this.EffectDiagramDelete(id); }}>删除</LinkBtn>
      </LinkBoxBtn>
      <CheckMessageBox>
        <ImgItem src={`${image}?imageView2/1/w/165/h/165/q/100`} />
        {checking === 5 && this.state[id] && (
          <CheckMessage>
            原因：{checkMessage || '未填写'}
          </CheckMessage>
        )}
        {checking === 5 && this.state[id] && (
          <Triangle />
        )}
      </CheckMessageBox>
      <Mess>
        <MessIcon style={{ cursor: (checking === 5 ? 'pointer' : 'auto') }} onClick={() => this.onShowMessage({ id, checking })}>{this.getIcon(checking)}</MessIcon>
        <MessText>{title}</MessText>
        <MessTime>{createTime}</MessTime>
      </Mess>
    </ImgBox>
  )

  /**
   * 执行分页
   */
  DoPage = ({ page, pageSize }) => {
    this.setState({
      skip: ((page - 1) * pageSize),
      limit: pageSize,
      current: page,
      cards: [],
    }, () => {
      this.requestCards();
    });
  }

  /**
  * 显示删除提示框
  * @param id
  */
  EffectDiagramDelete = (id) => {
    this.setState({
      showDeleteWarning: true,
      deletingId: id,
    });
  };
  hideDeleteDialog = () => {
    this.setState({ showDeleteWarning: false });
  };

  RemoveED = ({ id }) => {
    removeEffectDiagram({ id }).then(() => {
      this.setState({
        deletingId: -1,
      });
      this.requestCards();
    }).catch(() => {
      message.warn('数据跑掉了,刷新页面试试!');
    });
  }

  requestCards = () => {
    const { userid } = this.props;
    const { limit, skip, status } = this.state;
    getEffectDiagramList({ userid, limit, skip, status }).then((data) => {
      const cards = [];
      data.packs.map((x) => {
        const card = {};
        card.id = x._id;
        card.checking = x.status;
        let statusCN = '';
        switch (card.checking) {
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
        card.title = statusCN;
        card.createTime = x.createdAt.substr(0, 10);
        card.image = x.cover || x.images[0]; // 主图
        card.description = x.note; //
        card.checkMessage = x.checkMessage || ''; // 审核意见
        return cards.push(card);
      });
      this.setState({ cards, count: data.count });
    });
  }

  render() {
    const { showDeleteWarning, cards, deletingId, limit, count, current } = this.state;
    return (
      <VerticalLayout flex="1">
        <Layout width="100%" background="#fff">
          <VerticalLayout flex="1">
            <Layout background="#ffffff" height="120px" width="93%" margin="0 auto">
              <HorizontalLayout width="100%" justify="space-between" alignItems="flex-end" margin="0 0 30px 0" borderBottom="1px solid #cccccc" padding="50px 0 20px 0" color="black">
                <Layout>
                  我的效果图
                </Layout>
                <Layout>
                  <Link to={{ pathname: '/user/upload/new' }}><Button size="small" type="primary">上传效果图</Button></Link>
                </Layout>
              </HorizontalLayout>
            </Layout>
            <Layout justify="flex-start" align-content="flex-start" flexWrap="wrap" background="#ffffff" width="93%" margin="0 auto" padding="0 0 50px 0">
              {cards.map((card) => this.CardList({ ...card }))}
            </Layout>
            <Layout justify="center" background="#ffffff" width="93%" margin="0 auto" padding="0 0 50px 0">
              <Pagination onChange={(page, pageSize) => { this.DoPage({ page, pageSize }); }} defaultCurrent={1} current={current} pageSize={limit} total={count} />
            </Layout>
          </VerticalLayout>
        </Layout>
        <Modal
          title="警告"
          visible={showDeleteWarning}
          onOk={() => {
            this.RemoveED({ id: deletingId });
            this.hideDeleteDialog();
          }}
          onCancel={this.hideDeleteDialog}
        >确定删除吗</Modal>
      </VerticalLayout>
    );
  }
}

EffectDiagramListPage.propTypes = {
  userid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userid: makeSelectUserid(),
  effectdiagramlistpage: makeSelectEffectDiagramListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'effectDiagramListPage', reducer });
const withSaga = injectSaga({ key: 'effectDiagramListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EffectDiagramListPage);
