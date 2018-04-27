/**
 *
 * Layout
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';


const Box = (container = 'div') => styled[container]`
  ${(p) => p.flex && `flex:${p.flex}`};
  ${(p) => p.flexWrap && `flex-wrap:${p.flexWrap}`};
  ${(p) => p.width && `width:${p.width}`};
  ${(p) => p.height && `height:${p.height}`};
  ${(p) => p.fontSize && `font-size:${p.fontSize}`};
  ${(p) => p.color && `color:${p.color}`};
  ${(p) => p.boxSizing && `box-sizing:${p.boxSizing}`};
  ${(p) => p.minHeight && `min-height:${p.minHeight}`};
  ${(p) => p.maxHeight && `max-height:${p.maxHeight}`};
  ${(p) => p.minWidth && `min-width:${p.minWidth}`};
  ${(p) => p.maxWidth && `max-width:${p.maxWidth}`};
  cursor:${(p) => p.cursor || 'auto'};
  align-self:${(p) => p.alignSelf || 'auto'};
  display: ${(p) => p.display || 'flex'};
  border-radius: ${(p) => p.radius || p.borderRadius || 0};
  border-top: ${(p) => p.borderTop || 0};
  border-bottom: ${(p) => p.borderBottom || 0};
  border-left: ${(p) => p.borderLeft || 0};
  border-right: ${(p) => p.borderRight || 0};
  border: ${(p) => p.border || ''};
  flex-direction: ${(p) => p.direction || 'row'};
  align-items: ${(p) => p.alignItems || 'flex-start'};
  justify-content: ${(p) => p.justify || 'flex-start'};
  margin: ${(p) => p.margin || 0};
  padding: ${(p) => p.padding || 0};
  background: ${(p) => p.background || 'none'};
`;
/**
 *  布局基础容器
 * @returns {*} 容器组件
 * @constructor
 * @param container
 */
const Layout = Box();

/**
 * 垂直布局 控件从上至下排列
 */
const VerticalLayout = styled(Layout)`
  flex-direction: column;
`;

/**
 * 横向布局 控件从左至右排列
 */
const HorizontalLayout = styled(Layout)`
  flex-direction: row;
  align-items: ${(p) => p.alignItems || 'center'};
`;

const Vbox = styled(Layout)`
  flex-direction: column;
  align-items: ${(p) => p.alignItems || 'stretch'};
`;
const Hbox = styled(Layout)`
  flex-direction: row;
  align-items: ${(p) => p.alignItems || 'center'};
`;

/**
 * 图片布局
 */
const Image = Box('img');

const FlexBody = styled(Layout)`
  display: block;
  width:100%;
  margin: 0 auto;
  min-width: 750px;
  max-width: 1380px;
  @media (max-width: 1400px) {
    padding: 0 20px;
  }
`;

/**
 * 自适应页面容器
 */
const Body = styled.div`
  width: 1380px;
  margin: 0 auto;
  @media (max-width: 1400px) {
    width: 1180px;
    margin: 0 auto;
  }
  @media (max-width: 1200px) {
    width: 980px;
    margin: 0 auto;
  }
`;

const commonPropTypes = {
  margin: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  flex: PropTypes.string,
  alignSelf: PropTypes.string,
  cursor: PropTypes.string,
  background: PropTypes.string,
  fontSize: PropTypes.string,
  color: PropTypes.string,
  borderRadius: PropTypes.string,
  border: PropTypes.string,
  borderTop: PropTypes.string,
  borderBottom: PropTypes.string,
  borderLeft: PropTypes.string,
  borderRight: PropTypes.string,
  display: PropTypes.string,
  boxSizing: PropTypes.string,
  maxHeight: PropTypes.string,
  minHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  flexWrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
  justify: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'space-between', 'space-around']),
  alignItems: PropTypes.oneOf(['flex-start', 'center', 'flex-end', 'stretch', 'baseline']),
};

Box.propTypes = commonPropTypes;
Image.propTypes = commonPropTypes;
HorizontalLayout.propTypes = commonPropTypes;
VerticalLayout.propTypes = commonPropTypes;
Hbox.propTypes = commonPropTypes;
Vbox.propTypes = commonPropTypes;
Layout.propTypes = commonPropTypes;
FlexBody.propTypes = commonPropTypes;

export {
  Layout, VerticalLayout, HorizontalLayout, Body, FlexBody, commonPropTypes, Image,
  Hbox,
  Vbox,
};

