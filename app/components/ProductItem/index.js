/**
*
* ProductItem
*
*/

import React from 'react';
import PropTypes from 'prop-types';
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
  border-bottom: 1px solid #F2F2F2;
  padding-bottom: 15px;
  font-size: 13px;
  color: #999;
`;
const SeriesSpan = styled(HorizontalLayout)`
  color: #999;
  flex: 1;
  white-space:nowrap;
  max-width: 221px;
`;
const SpanItem = styled.p`
  flex:1;
  margin:0;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  //color: rgba(62,130,247,1);
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
    const { image, no, series, spec, tags, url, imageOnly, showLabel } = this.props;
    return (
      <ItemContainer>
        <ToProduct to={url}>
          <ImgBox>
            <Image src={image} alt={no} width="100%" maxWidth="300px" />
          </ImgBox>
          {!imageOnly &&
            <div>
              <Title>{no || '暂无'}</Title>
              <SizeSpan justify="space-between">
                <SpanItem>系列：{series || '暂无'} </SpanItem>
                <Spanp >规格：{spec || '暂无'}</Spanp>
              </SizeSpan>
            </div>
          }
        </ToProduct>
        {!imageOnly && showLabel &&
          <HorizontalLayout padding="0 15px" height="50px">
            <SeriesSpan>标签：
              <SpanItem>
                {tags.length === 0 && '暂无'}
                {tags.map((item) => (
                  <Link key={item._id} to={`/tags/${item._id}`}>&nbsp;{item.name}&nbsp;</Link>
                ))}
              </SpanItem>
            </SeriesSpan>
          </HorizontalLayout>
        }
      </ItemContainer>
    );
  }
}

ProductItem.propTypes = {
  image: PropTypes.string.isRequired,
  no: PropTypes.string, // 产品编号
  series: PropTypes.string, // 系列
  spec: PropTypes.string, // 规格
  tags: PropTypes.array, // 标签列表
  url: PropTypes.string.isRequired, // 跳转链接
  imageOnly: PropTypes.bool,
  showLabel: PropTypes.bool, // 标签页隐藏标签列
};
ProductItem.defaultProps = {
  tags: [],
  image: '',
  imageOnly: false,
  showLabel: true,
};

export default ProductItem;
