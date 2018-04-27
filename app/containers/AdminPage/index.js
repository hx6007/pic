/**
 *
 * AdminPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Icon, Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { HorizontalLayout } from '../../components/Layout';
import PackListPage from '../PackListPage/Loadable';
import AdminLoginPage from '../AdminLoginPage/Loadable';
import PackEditPage from '../PackEditPage/Loadable';
import TagEditPage from '../TagEditPage/Loadable';
import TagListPage from '../TagListPage/Loadable';
import UserPackEditPage from '../UserPackEditPage/Loadable';
import UserPackPage from '../UserPackPage/Loadable';
import AdminUserPage from '../AdminUserPage/Loadable';
import MyMenu from '../../components/Menu';
import { makeSelectAllowType, makeSelectToken, makeSelectUsername } from '../App/selectors';
import { logout as logoutAction } from '../App/actions';
import HtmlTitle from '../../components/HtmlTitle';
import TopicsListPage from '../TopicsListPage';
import TopicsPage from '../TopicsPage';


const { Header, Sider, Content } = Layout;


export class AdminPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    collapsed: false, // 导航栏是否关闭
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { location: { pathname }, token, username, allowType, logout } = this.props;
    if (!token && !pathname.includes('/admin/login')) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <HorizontalLayout minHeight="100vh" alignItems="stretch">
        <HtmlTitle></HtmlTitle>
        {token && <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <MyMenu isShrink={this.state.collapsed} allowType={allowType} />
        </Sider>}

        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <HorizontalLayout >
              <Icon style={{ padding: 20, cursor: 'pointer' }} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
              <HorizontalLayout flex="1">E图库 - 后台管理系统</HorizontalLayout>
              {token && <HorizontalLayout padding="0 30px 0 0">
                <span>欢迎你，{username}　</span>
                <Button onClick={logout}>退出</Button>
                <HorizontalLayout margin="0 0 0 15px">
                  <Link to="/" target="_blank"><Button type="primary">前台</Button></Link>
                </HorizontalLayout>
              </HorizontalLayout> }
            </HorizontalLayout>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route path="/admin/pack/:id" component={PackEditPage} />
              <Route path="/admin/pack" component={PackListPage} />
              <Route path="/admin/tags/:id" component={TagEditPage} />
              <Route path="/admin/tags" component={TagListPage} />
              <Route path="/admin/user_pack/:id" component={UserPackEditPage} />
              <Route path="/admin/user_pack" component={UserPackPage} />
              <Route path="/admin/user" component={AdminUserPage} />
              <Route path="/admin/topics/:id" component={TopicsPage} />
              <Route path="/admin/topics" component={TopicsListPage} />
              {!token && <Route path="/admin/login" component={AdminLoginPage} />}
              <Route component={() => <div>欢迎来到图库后台管理系统 版本号：20180130</div>} />
            </Switch>
          </Content>
        </Layout>
      </HorizontalLayout>
    );
  }
}

AdminPage.propTypes = {
  logout: PropTypes.func.isRequired,
  token: PropTypes.any,
  allowType: PropTypes.any,
  username: PropTypes.any,
  location: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  username: makeSelectUsername(),
  allowType: makeSelectAllowType(),
});


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(AdminPage);
