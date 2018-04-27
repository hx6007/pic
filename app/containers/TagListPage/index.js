/**
 *
 * TagListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Button, Input, Table, Modal } from 'antd';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSeriesPage, { makeSelectTags } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import AdminBread from '../../components/AdminBread';
import PageTitle from '../../components/PageTitle';
import TableData from './tableDataSource';

import { delTag, loadTags } from './actions';
import { updateUrlParam } from '../App/actions';

const { Search } = Input;

export class TagListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = {
    deletingIndex: -1,
    showDeleteWarning: false,
  };

  componentDidMount() {
    const { seriespage: { pageSize }, dispatch } = this.props;
    dispatch(loadTags(pageSize));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const { seriespage: { pageSize }, dispatch } = this.props;
      const urlParam = new URLSearchParams(nextProps.location.search);
      const keyword = urlParam.get('keyword');
      const page = urlParam.get('page') || 1;
      dispatch(loadTags(pageSize, page, keyword));
    }
  }

  /**
   * 显示删除提示框
   * @param index
   */
  onIconClick = (index) => {
    this.setState({
      showDeleteWarning: true,
      deletingIndex: index,
    });
  };
  deleteSerie = (index) => {
    const { dispatch, tags } = this.props;
    const id = tags[index].id;
    dispatch(delTag(id));
  };
  hideDeleteDialog = () => {
    this.setState({ showDeleteWarning: false });
  };

  render() {
    const { showDeleteWarning, deletingIndex } = this.state;
    const { tags, seriespage, dispatch, location } = this.props;
    const { error, loading, count: totalCount, pageSize } = seriespage;
    const urlParam = new URLSearchParams(location.search);
    const page = +(urlParam.get('page') || 1);
    const tableColumn = new TableData(tags || [], this.onIconClick);
    return (
      <VerticalLayout alignItems="stretch" >
        <HorizontalLayout justify="space-between" alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>二维码标签库管理</PageTitle>
            <AdminBread list={['首页', '二维码标签库库']} />
          </VerticalLayout>
          <HorizontalLayout>
            <Search
              placeholder="请输入标签名称"
              style={{
                marginRight: 30,
                width: 300,
              }}
              onChange={(e) => {
                const keyword = e.target.value.trim() || undefined;
                dispatch(updateUrlParam('keyword', keyword));
              }}
            />
            <Link to={{ pathname: '/admin/tags/new' }}><Button type="primary">添加新标签</Button></Link>
          </HorizontalLayout>
        </HorizontalLayout>
        <HorizontalLayout>{error && error.toString()}</HorizontalLayout>
        <Table
          dataSource={tags}
          columns={tableColumn}
          loading={loading}
          bordered
          scroll={{
            y: '65vh',
          }}
          pagination={{
            total: totalCount,
            showTotal: (t) => `共${t}条数据`,
            pageSize,
            current: page,
          }}
          rowKey="id"
          onChange={(pagination) => dispatch(updateUrlParam('page', pagination.current))}
        />
        <Modal
          title="警告"
          visible={showDeleteWarning}
          onOk={() => {
            this.deleteSerie(deletingIndex);
            this.hideDeleteDialog();
          }}
          onCancel={this.hideDeleteDialog}
        >确定删除吗</Modal>
      </VerticalLayout>
    );
  }
}

TagListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.any,
  tags: PropTypes.array,
  seriespage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  seriespage: makeSelectSeriesPage(),
  tags: makeSelectTags(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'seriesPage',
  reducer,
});
const withSaga = injectSaga({
  key: 'seriesPage',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TagListPage);
