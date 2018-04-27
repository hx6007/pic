/**
 *
 * UserPackPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Radio, Table, message } from 'antd';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserPackPage from './selectors';
import { makeSelectUrlParam, makeSelectAllowType } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import AdminBread from '../../components/AdminBread';
import PageTitle from '../../components/PageTitle';
import TableData from './tableDataSource';
import TableData5 from './tableDataSource5';
import { getPackCheckList } from '../../utils/service';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RadioStatus = styled.div`
   .ant-radio-button-wrapper-checked{
    background: #397FFB;
    color: #FFF !important;
  }
  .ant-radio-button-wrapper:last-child{
    border-radius: 0;
  }
  .ant-radio-button-wrapper:first-child{
    border-radius: 0;
  }
  label{
    font-size: 13px;
    color:#101010;
    width:100px;
    text-align: center;
  }
  label:hover{
    color:#101010;
  }
`;

export class UserPackPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super();
    this.state = {
      packs: [],
      loading: false,
      status: props.status || '3',
      page: 1,
      totalSize: 0,
    };
  }
  componentDidMount() {
    this.localList({ status: this.props.status });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      const param = new URLSearchParams(nextProps.location.search);
      const status = param.get('status') || '3';
      this.localList({ status });
    }
  }

  onChange = (e) => {
    const { history } = this.props;
    const status = e.target.value;
    history.push(`/admin/user_pack?status=${status}`);
  };

  localList = ({ page = 1, status = '3' } = {}) => {
    let skip = 0;
    if (page) {
      skip = (parseInt(page, 0) - 1) * 20;
      this.setState({ page });
    }
    this.setState({ loading: true, packs: [] });
    const params = {
      uid: '',
      skip,
      limit: 20,
      status: status || 3,
    };
    this.setState({ status: params.status });
    getPackCheckList({ ...params }).then((result) => {
      this.setState({ packs: result.packs, totalSize: result.count });
    }).catch((error) => {
      message.error('加载错误', error);
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, packs, totalSize, page } = this.state;
    const params = new URLSearchParams(this.props.location.search);
    const status = params.get('status') || '3';
    const { userpackpage, allowType } = this.props;
    const { error, totalCount = totalSize, pageSize = 20 } = userpackpage;
    const tableData = status === '5' ? (new TableData5(packs || [], this.onIconClick)) : (new TableData(packs || [], this.onIconClick));
    const showTwo = allowType.length || allowType.size;
    return (
      <VerticalLayout alignItems="stretch" >
        <HorizontalLayout alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>用户图片管理</PageTitle>
            <AdminBread list={['首页', '用户图片管理']} />
          </VerticalLayout>

        </HorizontalLayout>

        <HorizontalLayout justify="space-between" margin="0 0 20px 0">
          <RadioStatus>
            <RadioGroup onChange={this.onChange} value={status} >
              <RadioButton value="3">待一审</RadioButton>
              {showTwo > 10 && <RadioButton value="4">待二审</RadioButton>}
              {showTwo > 10 && <RadioButton value="5">审核不通过</RadioButton>}
              {showTwo > 10 && <RadioButton value="1">待发布</RadioButton>}
              {showTwo > 10 && <RadioButton value="2">已通过</RadioButton>}
            </RadioGroup>
          </RadioStatus>
        </HorizontalLayout>

        <HorizontalLayout>{error && error.toString()}</HorizontalLayout>
        <Table
          dataSource={tableData.getDataSource()}
          columns={tableData.getColumns()}
          loading={loading}
          bordered
          scroll={{
            y: '65vh',
          }}
          size="middle"
          pagination={{
            total: totalCount,
            showTotal: (t) => `共${t}条数据`,
            pageSize,
            current: parseInt(page, 0),
          }}
          onChange={(pagination) => { this.localList({ page: pagination.current, status }); }}
        />
      </VerticalLayout>
    );
  }
}

UserPackPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.any,
  userpackpage: PropTypes.any,
  status: PropTypes.any,
  location: PropTypes.object,
  allowType: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  userpackpage: makeSelectUserPackPage(),
  status: makeSelectUrlParam('status'),
  allowType: makeSelectAllowType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userPackPage', reducer });
const withSaga = injectSaga({ key: 'userPackPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPackPage);
