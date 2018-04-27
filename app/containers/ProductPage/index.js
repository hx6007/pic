/* eslint-disable react/prop-types,camelcase,no-alert */

/**
 *
 * ProductPage
 *
 */
/* eslint-disable react/no-array-index-key */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Icon, Affix, BackTop } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import QRCode from 'qrcode.react';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Bread from '../../components/Bread';
import { makeSelectPackInfo, makeSelectError, makeSelectLoading, makeSelectProductId, makeSelectSeriesInfo, makeSelectRelationInfo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadPackInfo } from './actions';
import xgt from './xgt.png';
import { HorizontalLayout, FlexBody, VerticalLayout } from '../../components/Layout';
import ProductTitle from '../../components/ProductTitle';
import Div from '../../components/Div';
import Image from '../../components/Image';
import Relation from './Relation';
import DesignedProductTitle from '../../components/DesignedProductTitle';
import { makeSelectTToken, makeSelectUrlParam } from '../App/selectors';
import UserTag from '../../components/UserTag/index';
import HtmlTitle from '../../components/HtmlTitle';
const MyHorizontalLayout = styled(HorizontalLayout) `
  border-bottom: 1px solid rgba(238,238,238,1);
  padding: 15px 0;
`;
const Button = styled.button`
  width: 360px;
  height:50px;
  background:rgba(62,130,247,1);
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
   @media (max-width: 1200px) {
    width: 280px;
  }
  @media (max-width: 980px) {
    width: 234px;
  }
`;
const Block = styled.div`
  background: white;
  padding:15px 20px;
  margin-bottom: 20px;
  @media (max-width: 1200px) {
     padding: 10px;
    }
    @media (max-width: 980px) {
       padding: 8px;
    }
`;
const VerticalLayoutFloat = styled(VerticalLayout)`
  margin:0 0 0 20px;
  width:400px;
  align-items:stretch;
   @media (max-width: 1200px) {
    width: 320px;
  }
  @media (max-width: 980px) {
    width: 250px;
  }
`;
const ProductImg = styled(Image)`
  margin-top: 10px;
`;
const BackToTop = styled.div`
  .ant-back-top-content {
    border-radius: 0;
  }
  .ant-back-top {
    right: 30px;
    bottom: 60px;
    height: 40px;
    width: 40px;
  }
`;
const BackPrevious = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3px;
  line-height: 1.5;
  background: #fff;
  color: #000;
  border-style: groove;
  border-width: 1px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  z-index: 10;
  position: fixed;
  right: 30px;
  bottom: 100px;
  height: 40px;
  width: 40px;
  cursor: pointer;
`;
const NeedVerticalLayout = styled(VerticalLayout)`
  padding: 20px;
  @media (max-width: 1200px) {
     padding: 10px;
    }
    @media (max-width: 980px) {
       padding: 8px;
    }
`;
const AHorizontalLayout = styled(HorizontalLayout)`
  font-size: 13px;
  margin: 10px 0;
  align-items: flex-start;
`;
const Img = styled.img`
  margin-right: 15px;
`;
const ToSearch = styled(Link)``;
const Blockend = styled(Block)`
  margin-bottom: 3px;
`;
const ProductPageBlock = styled(HorizontalLayout)`
  padding:12px 17px;
  background:#FFFFFF;
  margin-bottom: 20px;
  align-content: flex-start;
  @media (max-width: 1200px) {
     padding: 10px;
    }
    @media (max-width: 980px) {
       padding: 8px;
    }
`;
const BlockDiv = styled.div`
   position: relative;
   margin: 3px 3px;
   border-radius: 3px;
   &:hover{
     background-color: #eeeeee;
   }
   canvas{
     display: none;
     position: absolute;
     z-index: 1;
     box-shadow: 0px 0px 4px 0px rgba(170, 170, 170, 1);
     padding: 10px;
     background: #FFFFFF;
     left: 1px;
     top: 32px;
   }
   &:hover canvas{
     display: block !important;
   }
`;
const BlockWord = styled.div`
   font-size: 14px;
   height: 32px;
   border: 1px solid rgba(229, 229, 229, 1);
   padding: 0 15px;
   border-radius: 3px;
   color: #101010;
   text-align: center;
   line-height: 30px;
   max-width: 200px;
   white-space:nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
`;

export class ProductPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  state={
    isProduct: true,
  };
  componentDidMount() {
    if (this.props.product_id) {
      this.state.isProduct = true;
    } else {
      this.state.isProduct = false;
    }
    this.props.onLoadPackInfo(this.props.id, this.state.isProduct);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      if (nextProps.product_id) {
        this.state.isProduct = true;
      } else {
        this.state.isProduct = false;
      }
      this.props.onLoadPackInfo(nextProps.id, this.state.isProduct);
    }
  }
  getProductInfo(packInfo, product_id) {
    let productInfo;
    const productsCount = packInfo.products ? packInfo.products.length : 0;
// eslint-disable-next-line no-plusplus
    for (let i = 0; i < productsCount; i++) {
// eslint-disable-next-line no-underscore-dangle
      if (packInfo.products[i]._id === product_id) {
        productInfo = packInfo.products[i];
      }
    }
    return productInfo || false;
  }

  render() {
    const { loading, error, packInfo, product_id, relationInfo, ttoken } = this.props;
    const { tags } = packInfo;
    if (!ttoken && (packInfo.type === 7 || packInfo.type === 8)) {
      alert('登录后才能查看该产品');
      return <Redirect to={'/'} />;
    }
    let type;
    let typeCode;
    const productInfo = this.getProductInfo(packInfo, product_id, this.state.isProduct);
    switch (packInfo.type) {
      case 1:
        type = '产品图';
        typeCode = 1;
        break;
      case 2:
        type = '实景图';
        typeCode = 2;
        break;
      case 3:
        type = '效果图';
        typeCode = 3;
        break;
      case 4:
        type = '样板图';
        typeCode = 4;
        break;
      case 5:
        type = '直板图';
        typeCode = 5;
        break;
      case 6:
        type = '地面图';
        typeCode = 6;
        break;
      case 7:
        type = '装修效果图';
        typeCode = 7;
        break;
      case 8:
        type = '平面布局图';
        typeCode = 8;
        break;
      case 9:
        type = '整屋空间效果图';
        typeCode = 9;
        break;
      case 10:
        type = '整屋空间实景图';
        typeCode = 10;
        break;
      default:
        break;
    }
    // 只有产品图需要的内容
    const title = productInfo.no ? `${productInfo.no} ${productInfo.series ? `${productInfo.series}系列` : ''}` : '';
    const productNo = productInfo.no ? productInfo.no : '';
    const series = productInfo.series ? productInfo.series : '';
    const brand = productInfo.brand ? productInfo.brand : '';
    const spec = productInfo.spec ? productInfo.spec : '';
    // 只有除产品图需要展示的内容
    const spacesList = packInfo.spaces || [];
    const sitesList = packInfo.sites || [];
    const stylesList = packInfo.styles || [];
    const designer = packInfo.designer ? packInfo.designer : 'LOLA';
    const department = packInfo.department ? packInfo.department : '楼兰家居网';
    const shop = packInfo.shop ? packInfo.shop : '';
    const brandp = packInfo.brand ? packInfo.brand : '';
    const address = packInfo.location ? packInfo.location.detail : '';
    const decorateDate = packInfo.location ? packInfo.decorateDate : '';
    const area = packInfo.area || '';
    // 公用
    const productImgList = packInfo.images ? packInfo.images : [];
    const relatedProductsList = relationInfo || [];
    const productLabels = (tags || []).map((item) => (
      <Link to={`/tags/${item.id}`} key={item.id}>
        <BlockDiv><BlockWord>{item.name}</BlockWord><QRCode value={`http://www.51etuku.com/tags/${item.id}`} size={140} /></BlockDiv>
      </Link>));
    const productLabelsKeyywords = (tags || []).map((item) => item.name);
    const htmltitle = this.state.isProduct ? `${productNo}_${series}-` : `${`${spacesList.join('_')}_${sitesList.join('_')}_${stylesList.join('_')}_${type}-`}`;
    const description = this.state.isProduct ? `${productNo},${series},` : `${spacesList.join(',') + sitesList.join(',') + stylesList.join(',')}-${type}`;
    const keywords = this.state.isProduct ? `楼兰陶瓷产品${`,${productNo},${series},${brand},${spec},${productLabelsKeyywords.join(',')},`}` : `楼兰陶瓷${`${type},${spacesList.join(',')}${sitesList.join(',')}${stylesList.join(',')}`}`;
    return (
      <FlexBody minWidth="750px" background="#f4f4f4">
        <HtmlTitle
          title={htmltitle}
          description={description}
          keywords={keywords}
        ></HtmlTitle>
        { loading && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载中...'}</HorizontalLayout> }
        { error && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载出错...稍后重试哦！'}</HorizontalLayout> }
        { !error && <Div>
          <BackToTop>
            <BackTop />
          </BackToTop>
          <VerticalLayout margin="8px 0 0 0">
            <Bread first={typeCode} second={type} third={`${typeCode === 1 ? productNo : title}`} />
            <HorizontalLayout alignItems="flex-start" width="100%" margin="0 0 40px 0">
              <NeedVerticalLayout background="white" flex="1" alignItems="stretch">
                {this.state.isProduct && <MyHorizontalLayout>
                  <ProductTitle title={title} shop={shop} series={series} brand={brand} spec={spec} flex="1" />
                </MyHorizontalLayout> }
                {!this.state.isProduct && (spacesList.length > 0 || sitesList.length > 0 || stylesList.length) > 0 ?
                  <MyHorizontalLayout>
                    {!error && <DesignedProductTitle shop={shop} brand={brandp} title={title} spacesList={spacesList} sitesList={sitesList} stylesList={stylesList} flex="1" />}
                  </MyHorizontalLayout> : '' }
                {!this.state.isProduct && (address || decorateDate || area) &&
                <AHorizontalLayout>
                  { address && <HorizontalLayout flex="1" margin="0 10px 0 0">地址：{address}</HorizontalLayout>}
                  { decorateDate && <HorizontalLayout margin="0 30px 0 0">装修日期：{`${decorateDate.split('-')[0]}-${decorateDate.split('-')[1]}`}</HorizontalLayout> }
                  { area && <HorizontalLayout>面积：{area} /m<sup>2</sup> </HorizontalLayout>}
                </AHorizontalLayout> }
                <VerticalLayout alignItems="center">
                  {productImgList && productImgList.map((item, index) =>
                    <ProductImg src={item} key={index} alt={`${productNo}-${index}`} width="100%" maxWidth="1200px" margin="10px 0 0 0" />
              )}
                </VerticalLayout>
              </NeedVerticalLayout>
              <Affix>
                <VerticalLayoutFloat>
                  { ((this.state.isProduct && Array.isArray(tags) && (tags.length > 0)) || (!this.state.isProduct)) &&
                  <ProductPageBlock>
                    { this.state.isProduct ? <HorizontalLayout flexWrap="wrap" background="#FFF" alignItems="flex-start">{productLabels}</HorizontalLayout> : <UserTag designer={designer} department={department} /> }
                  </ProductPageBlock> }
                  {this.state.isProduct && productNo && <ToSearch to={`/products?type=3,7,8&keyword=${productNo}`}>
                    <Blockend>
                      <Button><Img src={xgt} alt="" width={20} />查看该产品效果图</Button>
                    </Blockend> </ToSearch >}
                  <Block>
                    <Relation relatedProductsList={relatedProductsList} margin="0 0 0 -15px" />
                  </Block>
                </VerticalLayoutFloat>
              </Affix>
              <Affix offsetBottom={100}>
                <BackPrevious onClick={() => { this.props.history.goBack(); }}>
                  <VerticalLayout fontSize="4em" alignItems="center">
                    <Icon type="rollback" />
                    <div>返回</div>
                  </VerticalLayout>
                </BackPrevious>
              </Affix>
            </HorizontalLayout>
          </VerticalLayout >
        </Div>}
      </FlexBody>
    );
  }
}

ProductPage.propTypes = {
  product_id: PropTypes.any,
  packInfo: PropTypes.any,
  relationInfo: PropTypes.any,
  loading: PropTypes.bool,
  error: PropTypes.any,
  onLoadPackInfo: PropTypes.func,
  ttoken: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  packInfo: makeSelectPackInfo(),
  seriesInfo: makeSelectSeriesInfo(),
  relationInfo: makeSelectRelationInfo(),
  product_id: makeSelectProductId(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  ttoken: makeSelectTToken(),
  id: makeSelectUrlParam('id'),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadPackInfo: (packId, isp) => dispatch(loadPackInfo(packId, isp)), // 加载产品包详情,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productPage', reducer });
const withSaga = injectSaga({ key: 'productPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductPage);
