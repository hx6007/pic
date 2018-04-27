/**
 *
 * ProductTag
 *
 */

import React from 'react';
import { Icon } from 'antd';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import { HorizontalLayout, VerticalLayout } from '../Layout';

const IconTo = styled(Link)`
display: flex;
color: #333;
align-items: center;
`;

function getContent(series, seriesCount) {
  return (<HorizontalLayout flex="1">
    <QRCode value={encodeURI(`http://www.51etuku.com/products?type=1&keyword=${series}`)} size={70} />
    <VerticalLayout margin="0 0 0 15px" flex="1">
      <span>{series}</span>
      <span>共计{seriesCount}个产品</span>
    </VerticalLayout>
    <Icon type="right" style={{ fontSize: 24, color: '#d3d3d3' }} />
  </HorizontalLayout>);
}
// eslint-disable-next-line react/prop-types
function ProductTag({ series, seriesCount }) {
  return (
    <IconTo to={`/products?type=1&keyword=${series}`}>
      {getContent(series, seriesCount)}
    </IconTo>
  );
}

ProductTag.propTypes = {};

export default ProductTag;
