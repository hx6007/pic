/* eslint-disable jsx-a11y/alt-text */
/**
*
* Footprint
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HorizontalLayout, VerticalLayout, Layout } from '../Layout/index';
import imgCode from '../../images/imgCode.jpg';

const FootprintList = styled(HorizontalLayout)`
  flex-wrap:wrap;
`;
const Footprintb = styled.div`
  position: relative;
  width:165px;
  height:208px;
  margin-right:20px;
  margin-bottom:20px;
  border:1px solid #fcfcfc;
  :nth-child(5n){
     margin-right:0px;
  }
  :hover{
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
        }
  :hover .close{
    display: block;
  }
`;
const Text = styled.p`
  width:138px;
  height:44px;
  margin:0 auto;
  line-height:44px;
  font-size:12px;
  color:#000 ;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ImgBox = styled(HorizontalLayout)`
  width:164px;
  height:164px;
  background:#f4f4f4;
  img{
    width: 100%;
    max-height: 100%;
  }
`;
const Delete = styled.span`
  width: 85px;
  height: 26px;
  line-height: 24px;
  font-size:12px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  color: #000000;
  text-align: center;
`;
const ToDetail = styled(Link)``;
export class Footprint extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    FootprintList: [
      {
        id: 0,
        img: '',
        title: '这里显示产品效果图名称',
      },
      {
        id: 1,
        img: '',
        title: '这里显示产品效果图名称',
      },
    ],
  };
  deleteAll() {
    // alert("确认清空足迹吗?");
    this.setState({ FootprintList: [] });
  }
  render() {
    const FootprintListt = this.state.FootprintList.map((item, index) =>
      (<Footprintb key={item.id} index={index}>
        <ToDetail to={`/product/${item.id}`}>
          <ImgBox><img src={item.img || imgCode} /></ImgBox>
          <Text>{item.title}</Text>
        </ToDetail>
      </Footprintb>)
    );

    return (
      <VerticalLayout background="#fff" flex="1" minHeight="575px" padding="20px 0">
        <VerticalLayout width="93%" margin="0 auto">
          <HorizontalLayout width="100%" padding="10px 0" fontSize="14px" color="#000" justify="space-between">
            <Layout>我的足迹</Layout>
            <Delete onClick={() => { this.deleteAll(); }}>清空足迹</Delete>
          </HorizontalLayout>
          <FootprintList width="100%" borderTop="1px solid #f5f5f5" padding="20px 0 0 0">
            {FootprintListt}
          </FootprintList>
        </VerticalLayout>
      </VerticalLayout>
    );
  }
}
Footprint.propTypes = {

};

export default Footprint;
