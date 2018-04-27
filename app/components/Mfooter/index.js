/* eslint-disable react/prop-types */
/**
*
* Mfooter
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { HorizontalLayout } from '../Layout/index';

import HomM from './home@2x.png';
import HomMH from './homeHover@2x.png';
import Find from './product@2x.png';
import FindH from './productHover@2x.png';
import Article from './article.png';
import ArticleH from './articlea.png';
import My from './user.png';
import MyH from './usera.png';

const MfooterB = styled(HorizontalLayout)`
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  box-shadow: 0px -1px 0px 0px rgba(230,230,230,0.7) ;
  background: #ffffff;
`;
const FooterBtn = styled(Link) `
  display: flex;
  flex:1;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  img{
    width: 30px;
    height: 30px;
  }`;
const Text = styled.p`
  text-align: center;
  height:16px; 
  font-size:11px;
  color: ${(p) => p.active ? '#3E82F7' : 'rgba(74,74,74,1)'};
  line-height:16px;
  margin:0;
 
`;
class Mfooter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { changeType, ftype } = this.props;
    const isType = ftype || 0;
    return (
      <MfooterB>
        <FooterBtn to={'/mobile'} onClick={() => { changeType(0); }}>
          {isType === 0 ? <img src={HomMH} alt="" /> : <img src={HomM} alt="" />}
          <Text active={isType === 0}>首页</Text>
        </FooterBtn>
        <FooterBtn to={'/mobile/pageList?type=1'} onClick={() => { changeType(1); }}>
          {isType === 1 ? <img src={FindH} alt="" /> : <img src={Find} alt="" />}
          <Text active={isType === 1}>找产品</Text>
        </FooterBtn>
        <FooterBtn to={'/mobile/articlelist'} onClick={() => { changeType(2); }}>
          {isType === 2 ? <img src={ArticleH} alt="" /> : <img src={Article} alt="" />}
          <Text active={isType === 2}>专题</Text>
        </FooterBtn>
        <FooterBtn to={'/mobile/user'} onClick={() => { changeType(3); }}>
          {isType === 3 ? <img src={MyH} alt="" /> : <img src={My} alt="" />}
          <Text active={isType === 3}>我的</Text>
        </FooterBtn>
      </MfooterB>
    );
  }
}

Mfooter.propTypes = {

};

export default Mfooter;
