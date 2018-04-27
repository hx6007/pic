/**
 *
 * LabelProductPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Pagination, BackTop } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLabelProductPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { VerticalLayout, HorizontalLayout, FlexBody } from '../../components/Layout';
import ProductItem from '../../components/ProductItem/index';
import { changePage, changeUrlParam, loadList } from './actions';
import {
  makeSelectLoginApp, makeSelectType, makeSelectPage,
  makeSelectUrlParam,
} from '../App/selectors';
import Tab from '../../components/Tab';
import HtmlTitle from "../../components/HtmlTitle";

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
const PageList = styled.p`
  font-size: 14px;
  padding-top: 25px;
  color: #999999;
`;
const PageListSpan = styled.span`
  font-size: 16px;
  color: #000;
`;
const PageHorizontalLayout = styled(HorizontalLayout)`
  border-bottom: 1px solid rgba(222,222,222,1);
`;
const PageListNum = styled.span`
  font-size: 20px;
`;

export class LabelProductPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const id = this.props.match.params.labelId;
    this.props.dispatch(loadList(id));
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
        showLabel={false}
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
    const { labelproductpage, appData, type, space, style, site, page, dispatch } = this.props;
    const { packs, count, pageSize, error, loading, name } = labelproductpage;
    return (

      <VerticalLayout minWidth="750px" display="block" margin="20px 0 0px 0" background="#f4f4f4" >
        <HtmlTitle
          title={`${name}_标签库-`}
          description={`${name}_标签库-`}
          keywords={`${name}_标签库-`}
        ></HtmlTitle>
        <FlexBody background="#f4f4f4">
          <VerticalLayout alignItems="stretch" >
            <Tab changeType={this.onSelectType} hasLogin={!!appData.ttoken} type={type} />
          </VerticalLayout>

          <PageHorizontalLayout justify="space-between">
            <PageList>标签：
            <PageListSpan>{name}</PageListSpan>
            </PageList>
            <PageList>共计 <PageListNum>{packs.length}</PageListNum> 个产品信息</PageList>
          </PageHorizontalLayout>

          { loading && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载中...'}</HorizontalLayout> }
          { error && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'加载出错...稍后重试哦！'}</HorizontalLayout> }
          { (!packs || packs.length === 0) && <HorizontalLayout margin="20px auto" fontSize="25px" alignItems="center" justify="center">{'暂无数据'}</HorizontalLayout>}
          <MyHorizontalLayout margin="0 -1%">
            {/* {(packs || []).map((item) => */}
            {/* <ProductItem {...item} Urltype={parseInt(type)} key={item._id} props={this.props} appData={appData} />)} */}
            {this.getProductList(packs || [])}
          </MyHorizontalLayout>
          { count && <HorizontalLayout margin="20px 0" alignItems="center" justify="center">
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

LabelProductPage.propTypes = {
  dispatch: PropTypes.func,
  LabelProductPage: PropTypes.object,
  type: PropTypes.any,
  space: PropTypes.any,
  style: PropTypes.any,
  site: PropTypes.any,
  page: PropTypes.any,
  appData: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  labelproductpage: makeSelectLabelProductPage(),
  page: makeSelectPage(),
  type: makeSelectType(),
  space: makeSelectUrlParam('space'),
  style: makeSelectUrlParam('style'),
  site: makeSelectUrlParam('site'),
  appData: makeSelectLoginApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'labelProductPage', reducer });
const withSaga = injectSaga({ key: 'labelProductPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LabelProductPage);
