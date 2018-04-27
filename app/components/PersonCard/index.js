/**
*
* PersonCard
*
*/

import React from 'react';
import styled from 'styled-components';
// import Link from 'react-router-dom/es/Link';
// import { Icon } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { HorizontalLayout, Layout, VerticalLayout } from '../Layout/index';
// import imgCode from '../../images/imgCode.jpg';
import makeSelectUserPage from '../../containers/UserPage/selectors';


const Vipbtn = styled(HorizontalLayout)`
  height:28px;
  line-height:28px;
  margin-right:10px;
  padding:0 10px;
  font-size:12px;
  color:#000;
  border:1px solid #e0e0e0;
  .anticon-wechat{
    font-size: 16px;
    margin-right: 5px;
  }
`;
// const FootprintList = styled(HorizontalLayout)`
//   flex-wrap:wrap;
// `;
// const Footprint = styled(Link)`
//   width:130px;
//   height:130px;
//   margin-right:25px;
//   margin-bottom:20px;
//   background:#e0e0e0;
//   :nth-child(7n){
//      margin-right:0px;
//   }
//    @media (max-width: 1400px) {
//      &:nth-child(7n){
//      margin-right:25px;
//     }
//     }
//     @media (max-width: 1200px) {
//      &:nth-child(7n){
//       margin-right:25px;
//     }
//     }
//   :hover{
//     box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
//   }
//   img{
//     width: 100%;
//     max-height: 100%;
//   }
// `;
// const ToFootprint = styled(Link)`
//   fontSize:14px;
//   color:#000 ;
// `;
// const HorizontalLayoutFun = styled(HorizontalLayout)`
//     width:410px;
//     height:115px;
//     align-items:center;
//     justify-content:space-around;
//      @media (max-width: 1200px) {
//      width:300px;
//     }
// `;
export class PersonCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { userpage } = this.props;
    const { userData } = userpage;
    return (
      <VerticalLayout flex="1">
        <Layout width="100%" background="#fff">
          <Layout background="#ffffff" height="200px" width="93%" margin="0 auto" alignItems="center">
            <HorizontalLayout flex="2" height="115px" borderRight="1px solid #f5f5f5">
              <Layout
// eslint-disable-next-line react/jsx-max-props-per-line
                width="80px" height="80px" background="#b3b3b3" radius="50%" alignItems="center" justify="center"
                margin="0 30px 0 0"
              >头像</Layout>
              <VerticalLayout flex="1">
                <Layout fontSize="16px" color="#000" margin="0 0 10px 0">{ userData ? userData.name : '没有名字'}</Layout>
                <HorizontalLayout>
                  <Vipbtn>{userData ? userData.customer_grade : '普通会员' }</Vipbtn>
                  {/* <Vipbtn><Icon type="wechat"/>绑定微信</Vipbtn>*/}
                </HorizontalLayout>
              </VerticalLayout>
            </HorizontalLayout>
            {/* <HorizontalLayoutFun>*/}
            {/* <VerticalLayout width="85px" alignItems="center">*/}
            {/* <Layout width="60px" height="60px" background="#f5f5f5" radius="8px" alignItems="center"*/}
            {/* justify="center">icon</Layout>*/}
            {/* <Layout height="24px" margin="5px 0 0 0" color="#737373" fontSize="13px">申请免费设计</Layout>*/}
            {/* </VerticalLayout>*/}
            {/* <VerticalLayout width="85px" alignItems="center">*/}
            {/* <Layout width="60px" height="60px" background="#f5f5f5" radius="8px" alignItems="center"*/}
            {/* justify="center">icon</Layout>*/}
            {/* <Layout height="24px" margin="5px 0 0 0" color="#737373" fontSize="13px">店面设计</Layout>*/}
            {/* </VerticalLayout>*/}
            {/* <VerticalLayout width="85px" alignItems="center">*/}
            {/* <Layout width="60px" height="60px" background="#f5f5f5" radius="8px" alignItems="center"*/}
            {/* justify="center">icon</Layout>*/}
            {/* <Layout height="24px" margin="5px 0 0 0" color="#737373" fontSize="13px">高清图</Layout>*/}
            {/* </VerticalLayout>*/}
            {/* </HorizontalLayoutFun>*/}
          </Layout>
        </Layout>
        {/* <Layout minHeight="377px" width="100%" margin="10px 0 0 0" padding="20px 0" background="#fff">*/}
        {/* <VerticalLayout width="93%" margin="0 auto">*/}
        {/* <HorizontalLayout width="100%" padding="5px 0" fontSize="14px" color="#000" justify="space-between">*/}
        {/* <Layout>我的足迹</Layout>*/}
        {/* <ToFootprint to={'/user/history'}>查看更多足迹</ToFootprint>*/}
        {/* </HorizontalLayout>*/}
        {/* <FootprintList width="100%" borderTop="1px solid #f5f5f5" padding="20px 0 0 0">*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* <Footprint to={'/product/:id'}><img src={imgCode} /></Footprint>*/}
        {/* </FootprintList>*/}
        {/* </VerticalLayout>*/}
        {/* </Layout>*/}
      </VerticalLayout>
    );
  }
}

PersonCard.propTypes = {
  userpage: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  userpage: makeSelectUserPage(),
});
const withConnect = connect(mapStateToProps);
export default compose(
  withConnect,
)(PersonCard);
