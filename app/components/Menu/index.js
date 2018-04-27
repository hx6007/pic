/**
*
* Menu
*
*/

import React from 'react';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VerticalLayout } from '../Layout';

const MenuLink = styled(NavLink)`
  height: 45px;
  display: flex;
  flex: 1;
  text-decoration: none !important;
  align-items: center;
  padding-left: 30px;
  div{
    margin-left: 15px;
  }
`;

function MenuItem({ to, title, icon, isShrink }) {
  return <MenuLink activeStyle={{ background: 'rgba(255,255,255,.1)' }} to={to} title={title}><Icon type={icon} />{!isShrink && <div>{title}</div>}</MenuLink>;
}
MenuItem.propTypes = {
  to: PropTypes.any,
  title: PropTypes.any,
  icon: PropTypes.any,
  isShrink: PropTypes.any,
};

function MyMenu({ isShrink, allowType }) {
  return (
    <VerticalLayout alignItems="stretch" padding="15px 0 0 0">
      {allowType.includes(1) && <MenuItem to="/admin/pack?type=1" title="产品管理" icon="shopping-cart" isShrink={isShrink} />}
      {allowType.includes(3) && <MenuItem to="/admin/pack?type=3" title="效果图管理" icon="video-camera" isShrink={isShrink} />}
      {allowType.includes(2) && <MenuItem to="/admin/pack?type=2" title="实景图管理" icon="eye-o" isShrink={isShrink} />}
      {allowType.includes(9) && <MenuItem to="/admin/pack?type=9,10" title="整屋空间管理" icon="home" isShrink={isShrink} />}
      {allowType.includes(4) && <MenuItem to="/admin/pack?type=4,5,6,7,8" title="店面管理" icon="shop" isShrink={isShrink} />}
      {allowType.includes(101) && <MenuItem to="/admin/tags" title="二维码标签库管理" icon="qrcode" isShrink={isShrink} />}
      {allowType.includes(1) && <MenuItem to="/admin/user_pack" title="用户图管理" icon="picture" isShrink={isShrink} />}
      {allowType.includes(1) && <MenuItem to="/admin/topics" title="专题管理" icon="file-text" isShrink={isShrink} />}
    </VerticalLayout>


  );
}

MyMenu.propTypes = {
  isShrink: PropTypes.any,
  allowType: PropTypes.any,
};

export default MyMenu;
