/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/**
 *
 * ProductItem
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import imgCode from './imgCode.jpg';
import Image from '../../components/Image';

import { HorizontalLayout, VerticalLayout } from '../../components/Layout';

const Title = styled.div`
  font-size:15px;
  font-family:MicrosoftYaHei;
  color:rgba(0,0,0,1);
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 10px 0;
`;
const Items = styled.div`
  font-size:13px;
  font-family:MicrosoftYaHei;
  margin-left: 10px;
`;
const ProductLink = styled(Link) `
  font-size:13px;
  font-family:MicrosoftYaHei;
`;
const ProductLink2 = styled.span `
  font-size:13px;
  font-family:MicrosoftYaHei;
  margin-bottom: 20px;
  display: block;
`;
const ProductSeries = styled.div`
  font-size:12px;
  font-family:MicrosoftYaHei;
  //margin-top: 20px;
`;
const ProductSpec = styled.div`
  font-size:12px;
  font-family:MicrosoftYaHei;
`;
const ScrollBox = styled.div`
  width: 356px;
  height: 450px;
  overflow-y: scroll;
  ::-webkit-scrollbar {/*滚动条整体样式*/
        width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }
    ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        background: #D3D3D3;
    }
  @media (max-width: 1200px) {
    width: 300px;
  }
  @media (max-width: 980px) {
    width: 234px;
  }
`;
const RetaleVerticalLayout = styled(VerticalLayout)`
   padding: 0 15px;
   
`;
const Showlg = styled.span`
  display: inline-block;
  @media (max-width: 980px) {
      display: none;
    }
`;
/**
 * 相关商品
 * @param image
 * @param title
 * @returns {*}
 * @constructor
 */
function Relation(props) {
  return (
    <RetaleVerticalLayout {...props} alignItems="stretch">
      <Title>相关产品信息</Title>
      <ScrollBox>
        {props.relatedProductsList ? props.relatedProductsList.map((item, index) =>
// eslint-disable-next-line react/no-array-index-key
          (<HorizontalLayout key={index} borderBottom="1px solid rgba(238,238,238,1)" padding="15px 0">
            <Image src={item.cover ? item.cover : imgCode} alt={item.sku_id + index} width="80px" height="80px" />
            <VerticalLayout flex="1">
              <Items>
                { item.pack_id ? <ProductLink to={`/product?id=${item.pack_id}&productid=${item._id}`}>{item.no}</ProductLink> : <ProductLink2 >{item.no}</ProductLink2> }
                {item.series && <ProductSeries><Showlg>系列：</Showlg>{item.series}</ProductSeries> }
                <ProductSpec>{item.spec && <span><Showlg>规格：</Showlg>{item.spec}</span>} { item.brand && <span><Showlg> 品牌：</Showlg>{item.brand}</span>}</ProductSpec>
              </Items>
            </VerticalLayout>
          </HorizontalLayout>)
        ) : <div>无相关产品的数据</div>}
      </ScrollBox>
    </RetaleVerticalLayout>
  );
}

Relation.propTypes = {};

export default Relation;

