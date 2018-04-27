/**
 *
 * AdminUserPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAdminUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { VerticalLayout } from '../../components/Layout';
import PageTitle from '../../components/PageTitle';
import AdminBread from '../../components/AdminBread';

export class AdminUserPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <VerticalLayout alignItems="stretch">
        <VerticalLayout>
          <PageTitle>后台用户管理</PageTitle>
          <AdminBread
            list={[
              '首页',
              '后台用户管理',
            ]}
          />

        </VerticalLayout>
      </VerticalLayout>
    );
  }
}

AdminUserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminuserpage: makeSelectAdminUserPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'adminUserPage', reducer });
const withSaga = injectSaga({ key: 'adminUserPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminUserPage);
