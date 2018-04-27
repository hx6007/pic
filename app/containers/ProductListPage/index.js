/**
 *
 * ProductListPage
 *
 */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Pagination, BackTop } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProductListPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { VerticalLayout, HorizontalLayout, FlexBody } from '../../components/Layout';
import ProductItem from '../../components/ProductItem/index';
import { changePage, changeUrlParam, loadList } from './actions';
import {
  makeSelectLoginApp, makeSelectType, makeSelectPage,
  makeSelectUrlParam,
} from '../App/selectors';
import Category from '../../components/Category';
import Tab from '../../components/Tab';
import HtmlTitle from '../../components/HtmlTitle';

const MyHorizontalLayout = styled(HorizontalLayout)`
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 75vh;
  margin-bottom: 40px;
  &:hover a{
  color: #333;
  }

 `;
const BackToTop = styled.div`
  .ant-back-top-content {
    border-radius: 0;
  }
  .ant-back-top {
    right: 30px;
    bottom: 50px;
    height: 40px;
    width: 40px;
  }
`;
export class ProductListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.dispatch(loadList());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.dispatch(loadList());
    }
  }

  onPageChange=(pageNumber) => {
    window.scroll(0, 0);
    this.props.dispatch(changePage(pageNumber));
  };

  onSelectType=(newTypeArray) => {
    this.props.dispatch(changeUrlParam('type', newTypeArray));
  };

  getProductList(packs) {
    return packs.map((item) => {
      const image = item.cover || item.images[0];
      let url = `/product?id=${item._id}`;
      const product = item.products[0] || {};
      if (item.type === 1) {
        url += `&productid=${product._id}`;
      }
      return (<ProductItem
        imageOnly={item.type !== 1}
        no={product.no}
        series={product.series}
        spec={product.spec}
        image={image}
        tags={item.tag}
        url={url}
        key={item._id}
      />);
    });
  }

  render() {
    const { productListPage, appData, type, type2, space, style, site, page, dispatch, keyword } = this.props;
    let typeCode ;
    const { packs, count, pageSize, error, loading } = productListPage;
    switch (parseInt(type2)) {
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
    const title = keyword ? `${keyword}-${typeCode}` : `${typeCode}-`;
    const description = keyword ? `${keyword}-${typeCode}` : `${typeCode}-`;
    const keywords = keyword ? `楼兰陶瓷产品-${keyword}-${typeCode}` : `${typeCode}-`;
    return (
      <VerticalLayout minWidth="750px" display="block" margin="15px 0 0 0" background="#f4f4f4" >
        <HtmlTitle
          title={title}
          description={description}
          keywords={keywords}
        ></HtmlTitle>
        <FlexBody background="#f4f4f4">
          <VerticalLayout alignItems="stretch" >
            <Tab keyword={keyword} hasLogin={!!appData.ttoken} type={type} />
            <Category
              changeType={this.onSelectType}
              changeSpace={(value) => dispatch(changeUrlParam('space', value))}
              changeStyle={(value) => dispatch(changeUrlParam('style', value))}
              changeSite={(value) => dispatch(changeUrlParam('site', value))}
              currentStyle={style}
              currentSpace={space}
              currentSite={site}
              hasLogin={!!appData.ttoken}
              type={type}
            />
          </VerticalLayout>
          { loading && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载中...'}</HorizontalLayout> }
          { error && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载出错...稍后重试哦！'}</HorizontalLayout> }
          { !loading && (!packs || packs.length === 0) && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">
            {keyword ? `找不到关键字为${keyword}的图片，换一个搜索条件试试？` : '暂无数据'}</HorizontalLayout>}
          <MyHorizontalLayout margin="0 -1%">
            {this.getProductList(packs || [])}
          </MyHorizontalLayout>
          { !!count && <HorizontalLayout margin="20px 0" alignItems="center" justify="center">
            <Pagination showQuickJumper current={page} pageSize={pageSize} total={count} onChange={this.onPageChange} />
          </HorizontalLayout>}
        </FlexBody>
        <BackToTop>
          <BackTop></BackTop>
        </BackToTop>
      </VerticalLayout>
    );
  }
}

ProductListPage.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.any,
  productListPage: PropTypes.object,
  type: PropTypes.any,
  keyword: PropTypes.any,
  space: PropTypes.any,
  style: PropTypes.any,
  site: PropTypes.any,
  page: PropTypes.any,
  appData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  productListPage: makeSelectProductListPage(),
  page: makeSelectPage(),
  type: makeSelectType(),
  space: makeSelectUrlParam('space'),
  style: makeSelectUrlParam('style'),
  site: makeSelectUrlParam('site'),
  keyword: makeSelectUrlParam('keyword'),
  type2: makeSelectUrlParam('type'),
  appData: makeSelectLoginApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'productListPage', reducer });
const withSaga = injectSaga({ key: 'productListPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProductListPage);
