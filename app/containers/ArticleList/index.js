/**
 *
 * ArticleList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Icon, NavBar, Pagination, PullToRefresh, Button } from 'antd-mobile';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticleList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import HtmlTitle from '../../components/HtmlTitle';
import Article from '../../components/Article';
import { changepage } from '../MobilePageList/actions';

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
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
const query = gql`
  query articleAnd($limit: Int!,$skip: Int!){
     articleList (limit: $limit, skip: $skip){
      pageInfo{
        hasNext
        totalCount
      }
      list{
        id:_id
        title
        describe
        images
        html
        video
        vr
        displayMode
        recorder
        status
       }
    }
  }
`;
function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

export class ArticleList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    limit: 10,  // 请求数据条数
    skip: 0,  // 间隔条数
    page: 1, // 当前有页数
    pageLimit: 10, // 每次增加的数据量
    hasNext: true, // 是否能加载下一页
    refreshing: false,
    down: false,
    height: document.documentElement.clientHeight,
  };
  changepage = (p) => {
    if (this.state.hasNext) {
      const page = parseInt(p) + 1;
      const limit = this.state.pageLimit * page;
      this.setState({ limit, page });
    }
  };
  componentDidMount() {
    const hei = this.state.height;
    setTimeout(() => this.setState({
      height: hei,
    }), 0);
  }
  render() {
    const { limit, skip } = this.state;
    return (
      <VerticalLayout width={'100%'}>
        <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
        <div style={{ width: '100%' }}>
          <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
            <HtmlTitle
              title={'专题'}
            ></HtmlTitle>
            <NavBar mode="light">{'万图专题'}</NavBar>
          </VerticalLayoutTop>
          <PullToRefresh
            ref={(el) => this.ptr = el}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            distanceToRefresh = {window.devicePixelRatio * 25}
            indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
            direction={this.state.down ? 'down' : 'up'}
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.setState({ refreshing: true });
              this.changepage(this.state.page);
              setTimeout(() => {
                this.setState({ refreshing: false });
              }, 1000);
            }}
          >
            <Query query={query} variables={{ limit, skip }}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                const { articleList } = data;
                const { list, pageInfo } = articleList;
                // console.log("list",list);
                const {  hasNext } = pageInfo;
                this.state.hasNext = hasNext;
                // const totalPage = Math.ceil(totalCount / this.state.limit);
                return (
                  <VerticalLayout width="100%">
                    {list.map((item, index) => (
                      <Article key={index} describe={item.describe} images={item.images} displayMode={item.displayMode} title={item.title} id={item.id} />
                      ))}
                  </VerticalLayout>);
              }}
            </Query>
          </PullToRefresh>
        </div>
        <HorizontalLayout width="100%" height="50px" background="#fff"></HorizontalLayout>
      </VerticalLayout>
    );
  }
}

ArticleList.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articlelist: makeSelectArticleList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articleList', reducer });
const withSaga = injectSaga({ key: 'articleList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticleList);
