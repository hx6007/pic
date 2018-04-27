/**
 *
 * Mlabellist
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMlabellist from './selectors';
import reducer from './reducer';
import saga from './saga';
import Combined from '../../containers/MobilePageList/searchindex.png';
import Close from '../MobileHome/close@2x.png';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import Image from '../../components/Image';
import { loadList, setGet, changeUrlParam } from './actions';
import { makeSelectUrlParam } from '../App/selectors';
import HtmlTitle from '../../components/HtmlTitle';

const SearchBox = styled(HorizontalLayout)`
  width:90%;
  height:32px; 
  padding: 0 10px;
  margin: 10px auto;
  background:rgba(240,240,240,1);
  border-radius: 15px ; 
  align-items: center;
  justify-content: flex-start;
  position: relative;
  input{
    flex: 1;
    min-width: 76%;
    max-width: 96%;
    height:20px; 
    margin: 0 10px;
    font-size:14px;
    color:rgba(0,0,0,1);
    line-height:20px;
    outline: none;
    border: none;
  }
 
`;
const SearchBarList = styled.div`
  position:absolute;
  top:32px;
  width: 375px;
  left: -16px;
  z-index:10001;
  background:#ffffff;
  border-radius:0 0 5px 5px;
  max-height: 150px;
  overflow-y: scroll;
`;
const SearchIcon = styled.div`
  width: 16px;
  height: 16px;
  font-size: 0;
  img{
    width: 16px;
    height: 16px;
  }
`;
const SearchIcon2 = styled(SearchIcon)`
  margin-right: 10px;
`;
const SearchItem = styled(HorizontalLayout)`
  fontsize: 14px;
  color: #000;
  padding: 8px 48px;
  height: 30px;
  background: #fff;
  &:hover{
    background: #ddd;
  }
`;
const MproductItem = styled(Link)`
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
const HorizontalLayoutName = styled(HorizontalLayout)`
  p{
  margin: 0;
  line-height: 19px;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  }
`;
const ListTop = styled(VerticalLayout)`
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 1000;
`;


export class Mlabellist extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state={
    keyword: '',
    tags: [],
    showFilter: false,
  };
  componentDidMount() {
    const { id } = this.props;
    this.props.dispatch(loadList(id));
  }
  clearKey() {
    this.setState({ showSearchList: false, keyword: '' });
    this.props.dispatch(changeUrlParam('keyword', ''));
  }
  searchThis(item) {
    if (item) {
      return this.props.dispatch(changeUrlParam('keyword', item));
    }
    this.props.dispatch(changeUrlParam('keyword', this.state.keyword));
  }
  changeVal(keyword) {
    this.setState({ showSearchList: true, keyword });
    const { dispatch } = this.props;
    dispatch(setGet(keyword));
  }
  render() {
    const { mlabellist } = this.props;
    const { list } = mlabellist;
    const { tags, name } = mlabellist;
    return (
      <VerticalLayout width="100%" background="#f5f5f5" minHeight="90vh">
        <HtmlTitle title={`${name}-`} keywords={`${name}-`} description={`${name}-`}></HtmlTitle>
        <ListTop>
          <VerticalLayout width="100%" background="#fff">
            <SearchBox>
              <input type="text" name="" id="" placeholder="请输入产品编号/产品系列" value={this.state.keyword || ''} onChange={(e) => { this.changeVal(e.target.value); this.setState({ showFilter: false }); }} />
              { this.state.keyword &&
              <SearchIcon2 onClick={() => { this.clearKey(); }}><img src={Close} alt="" /></SearchIcon2> }
              <SearchIcon onClick={() => { this.searchThis(); }}><img src={Combined} alt="" /></SearchIcon>
              {this.state.showSearchList ? <SearchBarList>
                {(list || []).map((item, index) =>
                  <SearchItem key={index} onClick={() => { this.setState({ keyword: item, showSearchList: false }); this.searchThis(item); }}>{item}</SearchItem>
              )}
              </SearchBarList> : ''}
            </SearchBox>
          </VerticalLayout>
          <HorizontalLayout width="100%" padding="10px 24px" alignItems="center" justify="space-between" background="#ffffff">
            <HorizontalLayout fontSize="13px" color="#777777">标签：<HorizontalLayoutName color="#3F83F8" maxWidth="150px"><p>{ name || '' }</p></HorizontalLayoutName></HorizontalLayout>
            <HorizontalLayout fontSize="13px" color="#777777">共 { tags.length || 0 } 个产品</HorizontalLayout>
          </HorizontalLayout>
        </ListTop>
        <VerticalLayout width="100%" height="91px" background="#fff"></VerticalLayout>
        <HorizontalLayout width="100%" flexWrap="wrap" justify="flex-start" alignItems="flex-start">
          { tags && tags.length > 0 && (tags || []).map((item, index) =>
// eslint-disable-next-line no-underscore-dangle
              (<MproductItem key={index} to={parseInt(item.type) === 1 ? `/mobile/productpage?id=${item._id}&productid=${item.products[0]._id}` : `/mobile/productpage?id=${item._id}`}>
                <MproductItemimg>
                  <Image src={item.cover || item.images[0]} alt={item.title} width="100%" maxWidth="300px" />
                </MproductItemimg>
                <VerticalLayout width="100%" padding="10px">
                  <ProdcutNo>{ item.products[0].no || '' }</ProdcutNo>
                  <ProdcutSer>{ item.products[0].series || '暂无' }</ProdcutSer>
                </VerticalLayout>
              </MproductItem>)
          )}
        </HorizontalLayout>
        <HorizontalLayout width="100%" height="50px" background="#f5f5f5"></HorizontalLayout>
      </VerticalLayout>
    );
  }
}

Mlabellist.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  mlabellist: makeSelectMlabellist(),
  id: makeSelectUrlParam('id'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mlabellist', reducer });
const withSaga = injectSaga({ key: 'mlabellist', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Mlabellist);
