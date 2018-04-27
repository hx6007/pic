/* eslint-disable no-unused-expressions */
/**
 *
 * ProductItem
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  padding-bottom: 10px;
  font-size: 13px;
  color: #999;
`;
const SpanItem = styled.span`
  cursor: pointer;
  max-width: 130px;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
const Tagslist = styled(HorizontalLayout)`
    margin: 0 15px;
    padding: 10px 0;
    font-size: 13px;
    color: #999;
    border-top: 1px solid #F2F2F2;
`;
const Tags = styled.p`
  flex: 1;
  padding: 0;
  margin: 0;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Tagsitem = styled(Link)`
  color: #000;
  font-size: 13px;
  margin-right: 5px;
`;
class ProductItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  goSeries(props, keyword) {
    const search = props.location.search; // could be '?category=1&keyword=99'
    const params = new URLSearchParams(search);
    params.set('keyword', keyword);
    params.set('page', 1);
    params.get('spaces') ? params.delete('spaces') : '';
    params.get('styles') ? params.delete('styles') : '';
    params.get('sites') ? params.delete('sites') : '';
    const url = `${props.location.pathname}?${params.toString()}`;
    props.history.push(url);
  }
  render() {
    const props = this.props;
    const product = props.products[0] || {};
    const tag = props.tag || [];
// eslint-disable-next-line no-underscore-dangle
    const productUrl = props.type === 1 ? `/product?id=${props._id}&productid=${product._id}` : `/product?id=${props._id}`;
    return (
      <ItemContainer>
        <ToProduct to={productUrl}>
          <ImgBox>
            <Image src={props.cover || props.images[0]} alt={props.title} width="100%" maxWidth="300px" />
          </ImgBox>
        </ToProduct>
        { props.Urltype === 1 && <Title> {product.no || '暂无'}</Title> }
        { props.Urltype === 1 && <SizeSpan justify="space-between">
          <SpanItem>系列：{product.series || '暂无'} </SpanItem>
          <Spanp title={product.spec}>规格：{product.spec || '暂无'}</Spanp>
        </SizeSpan> }
        { props.Urltype === 1 && <Tagslist>
          标签：
          <Tags>
            { tag.length > 0 ? (tag.map((item, index) => <Tagsitem to={`/tags/${item._id}`} key={index}>{item.name}</Tagsitem>)) : '暂无数据'}
          </Tags>
        </Tagslist> }
      </ItemContainer>
    );
  }
}

ProductItem.propTypes = {};

export default ProductItem;

