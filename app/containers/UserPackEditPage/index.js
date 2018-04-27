/**
 *
 * UserPackEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';
import { Spin, message } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserPackEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import AdminBread from '../../components/AdminBread';
import { loadPack, loadUploadToken } from '../App/actions';
import { savePack, deletePack, saveCheckMessage } from '../../utils/service';
import PackCheck1 from '../../components/PackEdit/PackCheck1';
import PackCheck2 from '../../components/PackEdit/PackCheck2';

export class UserPackEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.props.dispatch(loadPack(id));
    this.props.dispatch(loadUploadToken());
  }
  render() {
    const { userpackeditpage, dispatch } = this.props;
    const { token, pack } = userpackeditpage;
    if (pack === null) return <Spin />;
    return (
      <VerticalLayout alignItems="stretch" >
        <HorizontalLayout alignItems="flex-end" margin="0 0 30px 0">
          <VerticalLayout>
            <PageTitle>用户图片管理</PageTitle>
            <AdminBread list={['首页', '用户图片管理']} />
          </VerticalLayout>
        </HorizontalLayout>
        {pack.status === 1 && ( // 待发布
          <PackCheck2
            onSave={(obj) => {
              savePack({ id: this.props.match.params.id, ...obj })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('已发布');
                });
            }}
            uploadToken={token}
            onDelete={() => {
              deletePack(this.props.match.params.id)
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('已删除');
                });
            }}
            serverPack={pack}
            onRefuse={(checkMessage) => {
              saveCheckMessage({ id: this.props.match.params.id, checkMessage })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('审核成功, 审核不通过');
                });
            }}
          />
        )}
        {[2, 4].includes(pack.status) && ( // 已通过, 待二审
          <PackCheck2
            onSave={(obj) => {
              savePack({ id: this.props.match.params.id, ...obj })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success(`${pack.status === 5 ? '已保存, 待一审' : '二审成功, 已通过'}`);
                });
            }}
            uploadToken={token}
            onDelete={() => {
              deletePack(this.props.match.params.id)
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('已删除');
                });
            }}
            serverPack={pack}
            onRefuse={(checkMessage) => {
              saveCheckMessage({ id: this.props.match.params.id, checkMessage })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('审核成功, 审核不通过');
                });
            }}
          />
        )}
        {[3, 5].includes(pack.status) && ( // 待一审, 审核不通过
          <PackCheck1
            onSave={(obj) => {
              savePack({ id: this.props.match.params.id, ...obj })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('一审成功, 待二审');
                });
            }}
            uploadToken={token}
            onDelete={() => {
              deletePack(this.props.match.params.id)
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('已删除');
                });
            }}
            serverPack={pack}
            onRefuse={(checkMessage) => {
              saveCheckMessage({ id: this.props.match.params.id, checkMessage })
                .then(() => {
                  dispatch(push(`/admin/user_pack?status=${pack.status}`));
                  message.success('审核成功, 审核不通过');
                });
            }}
          />
        )}
      </VerticalLayout>
    );
  }
}

UserPackEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object,
  userpackeditpage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  userpackeditpage: makeSelectUserPackEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userPackEditPage', reducer });
const withSaga = injectSaga({ key: 'userPackEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPackEditPage);
