/* eslint-disable react/prop-types */
/**
*
* DesignedProductTitle
*
*/

import React from 'react';
import styled from 'styled-components';
import { HorizontalLayout, VerticalLayout } from '../Layout';

const ProductSeries = styled.span`
  font-size:13px;
  margin-right: 10px;
`;


function DesignedProductTitle(props) {
  return (
    <VerticalLayout {...props}>
      <h2>{props.shop}</h2>
      <HorizontalLayout>
        {props.brand && <ProductSeries>品牌：{props.brand} / </ProductSeries>}
        {props.spacesList.length > 0 ? <ProductSeries>空间：{props.spacesList.join(' ')} / </ProductSeries> : ''}
        {props.sitesList.length > 0 ? <ProductSeries>场所：{props.sitesList.join(' ')} / </ProductSeries> : ''}
        {props.stylesList.length > 0 ? <ProductSeries>风格：{props.stylesList.join(' ')}</ProductSeries> : ''}
      </HorizontalLayout>
    </VerticalLayout>
  );
}

DesignedProductTitle.propTypes = {
};

export default DesignedProductTitle;
