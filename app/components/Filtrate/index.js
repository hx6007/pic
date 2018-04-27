/* eslint-disable react/prop-types */
/**
*
* Filtrate
*
*/

import React from 'react';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout';
import { SITES, SPACES, STYLES } from '../../utils/universalConst';

const ClickTab = styled(HorizontalLayout)`
  width:78px;
  height:34px;
  margin-bottom:8px;
  margin-right:6px;
  border-radius:2px;
  font-size:13px;
  line-height:34px;
  border:${(props) => props.checked ? '1px solid #1890ff;' : '1px solid #E5E5E5'};
  background: ${(props) => props.checked ? '#1890ff;' : '#fff'};
  align-items: center;
  justify-content: center;
  color: ${(props) => props.checked ? '#fff;' : '#000'}; 

`;
class Filtrate extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        onClick={(e) => { e.stopPropagation(); onItemClick(checkedItem === item ? null : item); }}
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
        <VerticalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <VerticalLayout color="#1890ff">空间属性：</VerticalLayout>
          <HorizontalLayout width="100%" flexWrap="wrap" margin="10px 0 0 0">{this.getFilterList(SPACES, currentSpace, changeSpace)}</HorizontalLayout>
        </VerticalLayout>
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
        <VerticalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <HorizontalLayout color="#1890ff">风格属性：</HorizontalLayout>
          <HorizontalLayout width="100%" flexWrap="wrap" margin="10px 0 0 0">{this.getFilterList(STYLES, currentStyle, changeStyle)}</HorizontalLayout>
        </VerticalLayout>
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
        <VerticalLayout width="100%" borderBottom="1px solid rgba(222,222,222,1)" alignItems="baseline" flexWrap="wrap">
          <HorizontalLayout color="#1890ff">场所属性：</HorizontalLayout>
          <HorizontalLayout width="100%" flexWrap="wrap" margin="10px 0 0 0">{this.getFilterList(SITES, currentSites, changeSites)}</HorizontalLayout>
        </VerticalLayout>
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
  render() {
    const { changeType, changeSpace, changeStyle, changeSite, type, currentSpace, currentStyle, currentSite } = this.props;
    // console.log(SITES);
    const currentType = type[0] || 1;
    const spaceFilter = this.getSpaceFilter(currentType, currentSpace, changeSpace);
    const stylesFilter = this.getStyleFilter(currentType, currentStyle, changeStyle);
    const sitesFilter = this.getSitesFilter(currentType, currentSite, changeSite);
    return (
      <VerticalLayout width="100%">
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

Filtrate.propTypes = {

};

export default Filtrate;
