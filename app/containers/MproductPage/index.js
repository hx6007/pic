/* eslint-disable consistent-return,react/prop-types,no-alert,no-nested-ternary */
/**
 *
 * MproductPage
 *
 */
// eslint-disable-next-line react/no-array-index-key

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NavBar, Icon } from 'antd-mobile';
import { message } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { VerticalLayout, HorizontalLayout } from '../../components/Layout';
import Image from '../../components/Image';
import Add from './address.png';
import Aer from './CombinedShape@2x.png';
import Detail from './type.png';
import makeSelectMproductPage from './selectors';
import { makeSelectUrlParam } from '../App/selectors';
import { loadPackInfo } from './actions';
import HtmlTitle from '../../components/HtmlTitle';

const TagsItem = styled(Link)`
  display: flex;
  height:30px; 
  padding: 0 10px;
  margin-bottom: 10px;
  background:rgba(235,235,235,1);
  border-radius: 2px ; 
  font-size:13px;
  color:rgba(74,74,74,1);
  margin-right: 10px;
  align-items: center;
  justify-content: center;
`;
const Tagsp = styled.p`
  max-width: 100px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  font-family: "微软雅黑";
`;
const MproductItem = styled(VerticalLayout)`
  display: flex;
  flex-direction: column;
  width: 46%;
  margin: 10px 0 0 10px;
  background: #ffffff;`;
const ProdcutNo = styled.p`
  width: 100%;
  font-size:13px;
  color:rgba(74,74,74,1);
  margin: 0;
  line-height:18px;
  text-align: center;
  font-family: "微软雅黑";
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const ProdcutSer = styled.p`
  width: 100%;
  margin: 0;
  font-size:13px;
  color:#777777;
  line-height:18px;
  text-align: center;
  font-family: "微软雅黑";
`;
const MproductItemimg = styled(HorizontalLayout)`
  width: 100%;
  height: 180px;
  border: 10px solid #fff;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
   .lgfVqv{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    }
`;
const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const Picon = styled.img`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;
const Addp = styled.p`
  flex: 1;
  font-size:13px;
  font-family:PingFangSC-Regular;
  color:rgba(74,74,74,1);
  line-height:18px;
  margin: 0 ;
`;
const HorizontalLayoutA = styled(Link)`
  color: #3F83F8;
`;

export class MproductPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    isProduct: true,
  };
  componentDidMount() {
    if (this.props.product_id) {
      this.state.isProduct = true;
    } else {
      this.state.isProduct = false;
    }
    this.props.dispatch(loadPackInfo(this.props.id, this.state.isProduct));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      if (nextProps.product_id) {
        this.state.isProduct = true;
      } else {
        this.state.isProduct = false;
      }
      this.props.dispatch(loadPackInfo(nextProps.id, this.state.isProduct));
    }
  }
  goDetail(packid, id) {
    const { history } = this.props;
    if (packid) {
      history.push(`/mobile/productpage?id=${packid}&productid=${id}`);
      return false;
    }
    message.warning('该商品暂未录入！');
  }
  render() {
    const { location, mproductpage } = this.props;
    const { packInfo, relationInfo, loading, error } = mproductpage;
    const { products } = packInfo;
    const productsInfo = products ? products[0] : null;
    const { search } = location;
    const idProduct = new URLSearchParams(search).get('productid');
    let typeCode;
    switch (parseInt(packInfo.type)) {
      case 1:
        typeCode = '产品图';
        break;
      case 2:
        typeCode = '实景图';
        break;
      case 3:
        typeCode = '效果图';
        break;
      case 4:
        typeCode = '样板图';
        break;
      case 5:
        typeCode = '直板图';
        break;
      case 6:
        typeCode = '地面图';
        break;
      case 7:
        typeCode = '装修效果图';
        break;
      case 8:
        typeCode = '平面布局图';
        break;
      case 9:
        typeCode = '整屋空间效果图';
        break;
      case 10:
        typeCode = '整屋空间实景图';
        break;
      default:
        break;
    }
    const spacesList = packInfo.spaces || [];
    const sitesList = packInfo.sites || [];
    const stylesList = packInfo.styles || [];
    const productLabelsKeyywords = (packInfo.tags || []).map((item) => item.name);
    const htmltitle = this.state.isProduct ? `${productsInfo ? productsInfo.no : ''}_${productsInfo ? productsInfo.series : ''}-` : `${`${spacesList.join('_')}_${sitesList.join('_')}_${stylesList.join('_')}_${typeCode}-`}`;
    const description = this.state.isProduct ? `${productsInfo ? productsInfo.no : ''},${productsInfo ? productsInfo.series : ''},` : `${spacesList.join(',') + sitesList.join(',') + stylesList.join(',')},${typeCode},`;
    const keywords = this.state.isProduct ? `楼兰陶瓷产品${`,${productsInfo ? productsInfo.no : ''},${productsInfo ? productsInfo.series : ''},${productsInfo ? productsInfo.brand : ''},${productsInfo ? productsInfo.spec : ''},${productLabelsKeyywords.join(',')},`}` : `楼兰陶瓷${`${typeCode},${spacesList.join(',')},${sitesList.join(',')},${stylesList.join(',')},`}`;
    return (<VerticalLayout width="100%" background="#F5F5F5">
      <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
        <HtmlTitle
          title={htmltitle}
          description={description}
          keywords={keywords}
        ></HtmlTitle>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >{idProduct ? productsInfo ? productsInfo.no : '' : '详情'}</NavBar>
      </VerticalLayoutTop>
      <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
      {loading && <HorizontalLayout
        margin="20px auto" fontSize="15px" alignItems="center"
        justify="center"
      >{'加载中...'}</HorizontalLayout>}
      {error && <HorizontalLayout
        margin="20px auto" fontSize="15px" alignItems="center"
        justify="center"
      >{'加载出错...稍后重试哦！'}</HorizontalLayout>}
      { !loading && !error && <VerticalLayout width="100%">
        {idProduct &&
        <HorizontalLayout
          width="100%" padding="0 16px" height="44px" background="#fff" alignItems="center"
          justify="space-between" fontSize="13px"
        >
          <HorizontalLayout color="#9B9B9B">{productsInfo ? `${productsInfo.series} 品牌` : ''} </HorizontalLayout>
          <HorizontalLayoutA
            to={productsInfo ? `/mobile/pageList?type=3,7,8&keyword=${productsInfo.no}` : '/mobile'}
          >查看产品效果</HorizontalLayoutA>
        </HorizontalLayout>}
        <VerticalLayout width="100%">
          {packInfo.images ? packInfo.images.map((item, index) =>
// eslint-disable-next-line react/no-array-index-key
            <Image width="100%" key={index} maxWidth="500px" src={item} />
          ) : ''}
        </VerticalLayout>
        {idProduct &&
        <VerticalLayout width="100%" padding="20px 10px">
          <HorizontalLayout fontSize="15px" color="#000">{productsInfo ? productsInfo.no : ''}</HorizontalLayout>
          <HorizontalLayout width="100%" alignItems="center" justify="space-between" fontSize="13px" color="#9B9B9B">
            <HorizontalLayout>{productsInfo ? `系列： ${productsInfo.series} | ` : ''}{productsInfo ? `品牌： ${productsInfo.brand
              }` : ''}</HorizontalLayout>
            <HorizontalLayout>{productsInfo ? `规格： ${productsInfo.spec}` : ''}</HorizontalLayout>
          </HorizontalLayout>
        </VerticalLayout>}
        {idProduct &&
        <HorizontalLayout
          width="100%" alignItems="center" justify="flex-start" padding="20px 10px"
          borderTop="1px solid #EBEBEB" flexWrap="wrap"
        >
          {packInfo.tags ? packInfo.tags.map((item, index) =>
// eslint-disable-next-line react/no-array-index-key
            <TagsItem key={index} to={`/mobile/labelist?id=${item.id}`}><Tagsp>{item.name}</Tagsp></TagsItem>
          ) : ''}
        </HorizontalLayout>}
        {!idProduct && <HorizontalLayout width="100%" padding="20px 10px" alignItems="center" justify="flex-start">
          <HorizontalLayout
            width="40px" height="40px" background="rgba(155,155,155,1)" borderRadius="50%"
            margin="0 10px 0 0"
          ></HorizontalLayout>
          <VerticalLayout flex="1">
            <HorizontalLayout
              fontSize="15px"
              color="#000"
            >{packInfo.designer ? packInfo.designer : ''}</HorizontalLayout>
            <HorizontalLayout
              fontSize="13px"
              color="#9B9B9B"
            >{packInfo.department ? `所属单位 ${packInfo.department}` : ''}</HorizontalLayout>
          </VerticalLayout>
        </HorizontalLayout>}
        {!idProduct && <HorizontalLayout width="100%" height="10px" background="#EBEBEB"></HorizontalLayout>}
        {!idProduct && <VerticalLayout width="100%">
          {packInfo && packInfo.location && packInfo.location.detail &&
          <HorizontalLayout width="100%" padding="10px 16px" borderBottom="1px solid #EBEBEB">
            <Picon src={Add} />
            <Addp>{packInfo.location.detail}</Addp>
          </HorizontalLayout>}
          {packInfo && (packInfo.area || packInfo.decorateDate) &&
          <HorizontalLayout width="100%" padding="10px 16px" borderBottom="1px solid #EBEBEB">
            <Picon src={Aer} />
            <Addp>{packInfo.area ? `面积：${packInfo.area}㎡ | ` : ''}{`日期：${packInfo.decorateDate.split('-')[0]}-${packInfo.decorateDate.split('-')[1]}`}</Addp>
          </HorizontalLayout>}
          {packInfo && (packInfo.sites || packInfo.spaces || packInfo.styles) &&
          <HorizontalLayout width="100%" padding="10px 16px" borderBottom="1px solid #EBEBEB">
            <Picon src={Detail} />
            <Addp>
              {packInfo.sites.length > 0 ? `${packInfo.sites.join('、')} / ` : ''}
              {packInfo.spaces.length > 0 ? `${packInfo.spaces.join('、')} / ` : ''}
              {packInfo.styles.length > 0 ? `${packInfo.styles.join('、')} ` : ''}
            </Addp>
          </HorizontalLayout>}
        </VerticalLayout>}
        <HorizontalLayout width="100%" height="10px" background="#EBEBEB"></HorizontalLayout>
        <VerticalLayout width="100%" padding="20px 0">
          <HorizontalLayout padding="0 10px" fontSize="13px" color="#4A4A4A">相关产品信息</HorizontalLayout>
          <HorizontalLayout width="100%" flexWrap="wrap" justify="flex-start" alignItems="flex-start">
            {relationInfo ? relationInfo.map((item, index) =>
// eslint-disable-next-line react/no-array-index-key,no-underscore-dangle
                (<MproductItem
                  key={index} onClick={() => {
                    this.goDetail(item.pack_id, item._id);
                  }}
                >
                  <MproductItemimg>
                    <Image width="100%" maxWidth="500px" src={item.cover} />
                  </MproductItemimg>
                  <VerticalLayout width="100%" padding="10px">
                    <ProdcutNo>{item.no}</ProdcutNo>
                    <ProdcutSer>{item.series}</ProdcutSer>
                  </VerticalLayout>
                </MproductItem>)
            ) : ''}
          </HorizontalLayout>
        </VerticalLayout>
        <HorizontalLayout width="100%" height="50px" background="#f5f5f5"></HorizontalLayout>
      </VerticalLayout> }
    </VerticalLayout>);
  }
}

MproductPage.propTypes = {
  dispatch: PropTypes.func,
  product_id: PropTypes.any,
  mproductpage: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  mproductpage: makeSelectMproductPage(),
  product_id: makeSelectUrlParam('productid'),
  id: makeSelectUrlParam('id'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mproductPage', reducer });
const withSaga = injectSaga({ key: 'mproductPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MproductPage);
