/**
*
* Category
*
*/

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HorizontalLayout, VerticalLayout } from '../Layout';
import { SITES, SPACES, STYLES } from '../../utils/universalConst';

const ClickTab = styled.span`
  padding: 15px 0;
  color: ${(props) => props.checked ? 'rgba(62,130,247,1);' : '#000'}; 
  margin-right: 40px;
  cursor: pointer;
  &:hover{
  color: rgba(62,130,247,1);
  }
`;
const ClickTab2 = styled.span`
  width: 90px;
  padding: 15px 0;
  cursor: pointer;
  color: #999;
  font-size: 13px;
`;
const FilterItem = styled(HorizontalLayout)`
  flex: 1;
  flex-wrap: wrap;
  font-size: 13px;
`;

class Category extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  /**
   * 获取特定筛选列表
   * @param list
   * @param checkedItem
   * @param onItemClick
   */
  getFilterList(list, checkedItem, onItemClick) {
    return list.map((item) => (
      <ClickTab
        key={item}
        checked={item === checkedItem}
        onClick={() => { onItemClick(checkedItem === item ? null : item); }}
      >{item}</ClickTab>
    ));
  }

  /**
   * 获取空间属性列表
   * @param currentType
   * @param currentSpace
   * @param changeSpace
   * @returns {*}
   */
  getSpaceFilter(currentType, currentSpace, changeSpace) {
    if ([2, 3, 4, 5, 6, 7, 8].includes(currentType)) {
      return (
        <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <ClickTab2>空间属性：</ClickTab2>
          <FilterItem>{this.getFilterList(SPACES, currentSpace, changeSpace)}</FilterItem>
        </HorizontalLayout>
      );
    }
    return null;
  }

  /**
   * 获取风格属性列表
   * @param currentType
   * @param currentStyle
   * @param changeStyle
   * @returns {*}
   */
  getStyleFilter(currentType, currentStyle, changeStyle) {
    if (currentType !== 1) {
      return (
        <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <ClickTab2>风格属性：</ClickTab2>
          <FilterItem>{this.getFilterList(STYLES, currentStyle, changeStyle)}</FilterItem>
        </HorizontalLayout>
      );
    }
    return null;
  }

  /**
   * 获取场所属性列表
   * @param currentType
   * @param currentSites
   * @param changeSites
   * @returns {*}
   */
  getSitesFilter(currentType, currentSites, changeSites) {
    if (currentType !== 1) {
      return (
        <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <ClickTab2>场所属性：</ClickTab2>
          <FilterItem>{this.getFilterList(SITES, currentSites, changeSites)}</FilterItem>
        </HorizontalLayout>
      );
    }
    return null;
  }

  /**
   * 获取二级TAB按钮
   * @param text
   * @param isChecked
   * @param checkedType
   * @param uncheckType
   * @param onChangeType
   * @returns {*}
   */
  getSubTab(text, isChecked, checkedType, uncheckType, onChangeType) {
    return (<ClickTab
      checked={isChecked}
      onClick={() => {
        if (isChecked) {
          onChangeType(uncheckType);
        } else {
          onChangeType(checkedType);
        }
      }}
    >{text}</ClickTab>);
  }
  /**
   * 根据类型显示类型筛选条件
   * @param type
   * @param changeType
   * @returns {null}
   */
  getTypeFilter(type, changeType) {
    const currentType = type[0] || 1;
    const isSingleCheck = type.length === 1;
    switch (currentType) {
      default:
        return null;
      case 3:
      case 7:
      case 8:
        return (
          <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline">
            <ClickTab2>类型：</ClickTab2>
            { this.getSubTab('装修效果图', isSingleCheck && currentType === 7, [7], [3, 7, 8], changeType)}
            { this.getSubTab('平面布局图', isSingleCheck && currentType === 8, [8], [3, 7, 8], changeType)}
          </HorizontalLayout>
        );
      case 9:
      case 10:
        return (
          <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline">
            <ClickTab2>类型：</ClickTab2>
            { this.getSubTab('整屋空间效果图', isSingleCheck && currentType === 9, [9], [9, 10], changeType)}
            { this.getSubTab('整屋空间实景图', isSingleCheck && currentType === 10, [10], [9, 10], changeType)}
          </HorizontalLayout>
        );
      case 4:
      case 5:
      case 6:
        return (
          <HorizontalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline">
            <ClickTab2>类型：</ClickTab2>
            { this.getSubTab('样板间', isSingleCheck && currentType === 4, [4], [4, 5, 6], changeType)}
            { this.getSubTab('直板图', isSingleCheck && currentType === 5, [5], [4, 5, 6], changeType)}
            { this.getSubTab('地面图', isSingleCheck && currentType === 6, [6], [4, 5, 6], changeType)}
          </HorizontalLayout>
        );
    }
  }

  render() {
    const { changeType, changeSpace, changeStyle, changeSite, type, hasLogin, currentSpace, currentStyle, currentSite } = this.props;
    const currentType = type[0] || 1;
    let typeFilter = null;
    if (hasLogin) {
      typeFilter = this.getTypeFilter(type, changeType);
    } else if ([9, 10].includes(currentType)) {
      typeFilter = this.getTypeFilter(type, changeType);
    }
    const spaceFilter = this.getSpaceFilter(currentType, currentSpace, changeSpace);
    const stylesFilter = this.getStyleFilter(currentType, currentStyle, changeStyle);
    const sitesFilter = this.getSitesFilter(currentType, currentSite, changeSite);
    return (
      <VerticalLayout >
        {/* 类型 */}
        {typeFilter}
        {/* 空间属性 */}
        {spaceFilter}
        {/* 风格属性 */}
        {stylesFilter}
        {/* 场所属性 */}
        {sitesFilter}
      </VerticalLayout>
    );
  }
}

Category.propTypes = {
  changeType: PropTypes.func, // 选项卡选中回调
  changeSpace: PropTypes.func, // 改变空间属性回调
  changeStyle: PropTypes.func, // 改变风格属性回调
  changeSite: PropTypes.func, // 改变场所属性回调
  type: PropTypes.array, // 当前类型
  currentSpace: PropTypes.any, // 当前选中空间
  currentStyle: PropTypes.any, // 当前选中风格
  currentSite: PropTypes.any, // 当前选中场所
  hasLogin: PropTypes.bool, // 是否登录
};

export default Category;
