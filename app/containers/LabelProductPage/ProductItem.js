/* eslint-disable no-unused-expressions */
/**
 *
 * ProductItem
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import QRCode from 'qrcode.react';
import { HorizontalLayout } from '../../components/Layout/index';
import Image from '../../components/Image/index';

const ItemContainer = styled.div`
    display: flex;
    background: #fff;
    position: relative;
    border-radius:4px;
    overflow: hidden;
    flex-direction: column;
    text-decoration: none;
    color: #333333;
    border: 1px solid #f4f4f4;
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px transparent;
    transition-duration: 0.3s;
    transition-property: box-shadow;
    &:hover,&:focus,&:active {
      border:1px solid transparent;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.15); 
      img{
        opacity: 0.7;
      }
    }
    width: 18%;
    margin:10px 1%;
    box-sizing: border-box;
    @media (max-width: 1200px) {
       width: 23%;
      }
    @media (max-width: 980px) {
       width: 31.33333%;
      }
  `;
const ImgBox = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-bottom:100%;
  border: 10px solid #fff;
  &:before{
  content:""; 
  display:inline-block; 
  }
    .lgfVqv{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    }
`;
const Title = styled.span`
    display: block;
    color: #000;
    word-break: break-all;
    margin: 20px 15px 5px 15px;
  `;
const SizeSpan = styled(HorizontalLayout)`
  margin: 0 15px;
  border-bottom: 1px solid #F2F2F2;
  font-size: 13px;
  padding-bottom: 15px;
  color: #999;
`;
const SeriesSpan = styled(HorizontalLayout)`
  color: #999;
  flex: 1;
`;
const SpanItem = styled.span`
  //color: rgba(62,130,247,1);
  cursor: pointer;
  max-width: 130px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SpanItemPage = styled.span`
  //color: #000;
  cursor: pointer;
`;
const ToProduct = styled(Link)`
  position: relative;
`;
const Spanp = styled.p`
  height: 21px;
  //width: 228px;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: top;
  font-family: "微软雅黑";
  font-size: 14px;
  max-width: 130px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class ProductItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const props = this.props;
    console.log('aaaaaaaaaaaa', props);
    const tags = props.tag || [];
    const islogin = props.appData.ttoken;
    const product = props.products[0] || {};
// eslint-disable-next-line no-underscore-dangle
    const productUrl = props.type === 1 ? `/product?id=${props._id}&productid=${product._id}` : `/product?id=${props._id}`;
    if (!islogin && (props.type === 7 || props.type === 8)) {
      return null;
    }
    return (
      <ItemContainer>
        <ToProduct to={productUrl}>
          <ImgBox>
            <Image src={props.cover || props.images[0]} alt={props.title} width="100%" maxWidth="300px" />
          </ImgBox>
          { props.Urltype === 1 && <Title> {product.no || '暂无'}</Title> }
          { props.Urltype === 1 && <SizeSpan justify="space-between">
            <SpanItem>系列：{product.series || '暂无'} </SpanItem>
            <Spanp title={product.spec}>规格：{product.spec || '暂无'}</Spanp>
          </SizeSpan> }
        </ToProduct>
        { props.Urltype === 1 && <HorizontalLayout padding="0 15px" height="50px">
          <SeriesSpan>标签：
            <SpanItemPage>
              {tags.length === 0 && '暂无'}
              {tags.map((item) => (
                <Link key={item._id} to={`/tags/${item._id}`}>&nbsp;{item.name}&nbsp;</Link>
              ))}
            </SpanItemPage>
          </SeriesSpan>
        </HorizontalLayout>}
      </ItemContainer>
    );
  }
}

ProductItem.propTypes = {};

export default ProductItem;

