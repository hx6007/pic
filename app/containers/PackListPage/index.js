/**
 *
 * PackListPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Button, Input, Modal, Table } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPackListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import { delPack, loadPacks, updateKeyword, updatePage } from './actions';
import AdminBread from '../../components/AdminBread';
import TableData from './tableDataSource';
import { getTypeName } from '../../utils/typeParser';
import Parser from '../../utils/urlParamParser';
const { Search } = Input;

export class PackListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    showDeleteWarning: false,
    deletingId: 0, // 需要删除的packId
  };

  componentDidMount() {
    this.props.dispatch(loadPacks());
  }

  componentWillReceiveProps(nexProps) {
    if (nexProps.location !== this.props.location) { // 当列表参数改变时重新加载当前页
      this.props.dispatch(loadPacks());
    }
  }


  /**
   * 列表类型
   * @returns {number} 1 产品 2 实景图 3 效果图 4 样板间 5 直板图 6 地面图 7 装修效果图 8 平面布局图
   */

  render() {
    const { showDeleteWarning, deletingId } = this.state;
    const { location, packListStore, dispatch } = this.props;
    const { error, loading, packs, totalCount, pageSize } = packListStore;
    const urlParam = new Parser(location.search);
    const keyword = urlParam.get('keyword');
    const page = urlParam.get('page') || 1;
    const type = parseInt(urlParam.get('type')) || 1;
    const name = getTypeName(type);
    const tableData = new TableData(packs || [], type, this.onDeleteClick);

    return (
      <VerticalLayout alignItems="stretch" >
        <HorizontalLayout justify="space-between" alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>{name}管理</PageTitle>
            <AdminBread list={['首页', `${name}管理`]} />
          </VerticalLayout>
          <HorizontalLayout>
            <Search
              onChange={(e) => {
                const keyword = e.target.value.trim();
                dispatch(updateKeyword(keyword));
              }} placeholder="请输入产品编号/系列名称"
              value={keyword} style={{ marginRight: 30, width: 300 }}
            />
            <Link to={{ pathname: '/admin/pack/new', state: { type } }}><Button type="primary">添加新{name}</Button></Link>
          </HorizontalLayout>
        </HorizontalLayout>
        <HorizontalLayout>{error && error.toString()}</HorizontalLayout>
        <Table
          dataSource={tableData.getDataSource()} columns={tableData.getColumns()} loading={loading}
          bordered size="middle" scroll={{ y: '65vh' }}
          pagination={{ total: totalCount, showTotal: (t) => `共${t}条数据`, pageSize, current: parseInt(page) }}
          onChange={(pagination) => dispatch(updatePage(pagination.current))}
        />
        <Modal
          title="警告"
          visible={showDeleteWarning}
          onOk={() => {
            dispatch(delPack(deletingId));
            this.hideDeleteDialog();
          }}
          onCancel={this.hideDeleteDialog}
        >确定删除吗</Modal>
      </VerticalLayout>

    );
  }

  /**
   * 显示删除提示框
   * @param packId
   */
  onDeleteClick=(packId) => {
    this.setState({
      showDeleteWarning: true,
      deletingId: packId,
    });
  };
  hideDeleteDialog=() => {
    this.setState({ showDeleteWarning: false });
  };
}

PackListPage.propTypes = {
  packListStore: PropTypes.any,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  packListStore: makeSelectPackListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'packListPage', reducer });
const withSaga = injectSaga({ key: 'packListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PackListPage);
