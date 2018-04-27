/* eslint-disable react/prop-types */
/**
*
* ProductTitle
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout';

const ProductSeries = styled(Link)`
  font-size:13px;
  margin-right: 20px;
`;

const ProductBrand = styled.span`
  margin-right: 20px;
`;

function ProductTitle(props) {
  return (
    <VerticalLayout {...props}>
      <h2>{props.title}</h2>
      <HorizontalLayout>
        {props.series ? <span>系列：</span> : ''}
        {props.series ? <ProductSeries to={`/products?type=1&keyword=${props.series}`}>{props.series}</ProductSeries> : ''}
        {props.brand ? <ProductBrand>品牌：{props.brand}</ProductBrand> : '' }
        {props.spec ? <span>规格：{props.spec}</span> : '' }
      </HorizontalLayout>
    </VerticalLayout>
  );
}

ProductTitle.propTypes = {
  title: PropTypes.string,
};

export default ProductTitle;
