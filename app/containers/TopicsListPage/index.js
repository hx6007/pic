/**
 *
 * TopicsListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button, Input, Table, Modal, message } from 'antd';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTopicsListPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import AdminBread from '../../components/AdminBread';
import PageTitle from '../../components/PageTitle';
import TableData from './tableDataSource';
import { client } from '../../app';

const { Search } = Input;

export class TopicsListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    showDeleteWarning: false,
    deletingId: 0,
    limit: 20,
    page: 1,
    keyword: '',
  }

  /**
   * 显示删除提示框
   * @param id
   */
  onDeleteClick = (id) => {
    this.setState({
      showDeleteWarning: true,
      deletingId: id,
    });
  };
  hideDeleteDialog = () => {
    this.setState({ showDeleteWarning: false });
  };

  query() {
    return gql`
      query searchPage($keyword: String, $limit: Int, $skip: Int) {
        articleList(keyword: $keyword, limit: $limit, skip: $skip) {
          pageInfo {
            hasNext
            totalCount
          }
          list {
            id: _id
            title
            describe
            images
            updatedAt
            recorder
            status
          }
        }
      }
    `;
  }

  delete = ({ deletingId }) => {
    client.mutate({
      mutation: gql`
        mutation remove {
          articleRemove(id: "${deletingId}") {
            id: _id
          }
        }`,
    }).then((result) => {
      const { data } = result;
      if (data && data.articleRemove && data.articleRemove.id) {
        message.success('已删除此专题');
      } else {
        message.warn('目前不能删除此专题');
      }
    });
  }

  render() {
    const { showDeleteWarning, deletingId, keyword, limit, page } = this.state;
    return (
      <VerticalLayout alignItems="stretch" >
        <HorizontalLayout justify="space-between" alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>专题管理</PageTitle>
            <AdminBread list={['首页', '专题']} />
          </VerticalLayout>
          <HorizontalLayout>
            <Search
              placeholder="请输入专题名称"
              style={{
                marginRight: 30,
                width: 300,
              }}
              onChange={(e) => {
                this.setState({ keyword: e.target.value.trim() || '' });
              }}
            />
            <Link to={{ pathname: '/admin/topics/new' }}><Button type="primary">添加新专题</Button></Link>
          </HorizontalLayout>
        </HorizontalLayout>

        <Query query={this.query()} variables={{ keyword, limit, skip: (page - 1) * limit }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { articleList } = data;
            const { pageInfo, list } = articleList;
            const { totalCount } = pageInfo;
            const tableColumn = new TableData(list || [], this.onDeleteClick);
            return (
              <Table
                dataSource={list}
                columns={tableColumn}
                loading={loading}
                bordered
                size="small"
                scroll={{
                  y: '65vh',
                }}
                pagination={{
                  total: totalCount,
                  showTotal: (t) => `共${t}条数据`,
                  pageSize: limit,
                  current: page,
                }}
                rowKey="id"
                onChange={(pagination) => { this.setState({ page: pagination.current }); }}
              />
            );
          }}
        </Query>

        <Modal
          title="警告"
          visible={showDeleteWarning}
          onOk={() => {
            this.delete({ deletingId });
            this.hideDeleteDialog();
          }}
          onCancel={this.hideDeleteDialog}
        >确定删除吗</Modal>
      </VerticalLayout >
    );
  }
}

TopicsListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  topicslistpage: makeSelectTopicsListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'topicsListPage', reducer });
const withSaga = injectSaga({ key: 'topicsListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TopicsListPage);
