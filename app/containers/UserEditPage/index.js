/**
 *
 * UserEditPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';

export class UserEditPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
      </div>
    );
  }
}

UserEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  usereditpage: makeSelectUserEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userEditPage', reducer });
const withSaga = injectSaga({ key: 'userEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserEditPage);
