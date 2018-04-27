/**
*
* Tab
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HorizontalLayout } from '../Layout';

const ClickTab = styled(Link)`
  color: ${(props) => props.checked ? 'rgba(62,130,247,1);' : 'rgba(51,51,51,1);'};
  border-bottom: ${(props) => props.checked ? '3px solid rgba(62,130,247,1)' : '3px solid #f4f4f4'}; 
  margin-right: 40px;
  padding: 15px 0 13px 0;
  text-decoration: none !important;
  
`;

class Tab extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  generateTab(types, keyword, isChecked, tabName) {
    let url = `/products?type=${types.toString()}`;
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    return <ClickTab to={url} checked={isChecked}>{tabName}</ClickTab>;
  }
  render() {
    const { type, hasLogin, keyword } = this.props;
    const firstType = type[0] || 1;
    const xgtArray = hasLogin ? [3, 7, 8] : [3];
    return (
      <HorizontalLayout borderBottom="1px solid rgba(222,222,222,1)">
        {this.generateTab([1], keyword, [1].includes(firstType), '产品图')}
        {this.generateTab(xgtArray, keyword, [3, 7, 8].includes(firstType), '效果图')}
        {this.generateTab([2], keyword, [2].includes(firstType), '实景图')}
        {this.generateTab([9, 10], keyword, [9, 10].includes(firstType), '整屋图')}
        {hasLogin && this.generateTab([4, 5, 6], keyword, [4, 5, 6].includes(firstType), '店面图')}
        {/* <ClickTab onClick={() => changeType(5)} showColor={Type == 5}>视频</ClickTab> */}
      </HorizontalLayout>
    );
  }
}

Tab.propTypes = {
  type: PropTypes.array, // 当前类型
  keyword: PropTypes.any, // 当前搜索关键字
  hasLogin: PropTypes.bool, // 是否登录
};

export default Tab;
