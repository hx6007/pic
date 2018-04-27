/* eslint-disable react/prop-types,radix,no-console */
/* eslint-disable radix */
/**
 *
 * MobilePageList
 *
 */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd-mobile';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMobilePageList from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout/index';
import Combined from './searchindex.png';
import Close from '../MobileHome/close@2x.png';
import { loadList, changeUrlParam, setGet, changepage } from './actions';
import Image from '../../components/Image';
import Filtrate from '../../components/Filtrate';
import { makeSelectTToken, makeSelectType, makeSelectUrlParam } from '../App/selectors';
import Mpicker from '../../components/Mpicker';
import HtmlTitle from "../../components/HtmlTitle";

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
const ProdcutSer = styled(HorizontalLayout)`
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
const ListTop = styled(VerticalLayout)`
  position: fixed;
  top: 44px;
  left: 0;
  width: 100%;
  z-index: 1000;
`;
const Mark = styled(HorizontalLayout)`
  position: fixed;
  top: 135px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  align-items: start;
  height: 71vh;
  overflow-y: scroll;
`;
const FiltrateBtn = styled(HorizontalLayout)`
  position:fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 44px;
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
const HorizontalLayoutPag = styled(HorizontalLayout)`
  width: 100%;
  .am-pagination{
  width: 100%;
  padding: 10px;
  }
  .arrow-align,,.am-pagination-wrap{
  font-size: 13px;
  }
`;
const Tags = styled.p`
  flex: 1;
  text-align: left;
  padding: 0;
  margin: 0;
  white-space:nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Tagsitem = styled.span`
  color: #000;
  font-size: 13px;
  margin-right: 5px;
`;
export class MobilePageList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    showFilter: false, // 筛选条件的显示隐藏
    keyword: this.props.keyword, // 关键字
    showSearchList: false, // 展示搜索列表
    refreshing: false,
    packs: [], // 产品列表
    height: document.documentElement.clientHeight,
  };
  componentDidMount() {
    this.props.dispatch(loadList());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.dispatch(loadList());
    }
  }
  onSelectType=(type) => {
    this.props.dispatch(changeUrlParam('type', type));
  };
// eslint-disable-next-line react/sort-comp
  clearKey() {
    this.setState({ showSearchList: false, keyword: '' });
    this.props.dispatch(changeUrlParam('keyword', ''));
  }
  changeVal(keyword) {
    this.setState({ showSearchList: true, keyword });
    const { dispatch } = this.props;
    dispatch(setGet(keyword));
  }
  searchThis(item) {
    if (item) {
      return this.props.dispatch(changeUrlParam('keyword', item));
    }
    this.props.dispatch(changeUrlParam('keyword', this.state.keyword));
  }
  render() {
    const { mobilepagelist, type, type2, space, style, site, dispatch, keyword, page, ttoken } = this.props;
    const { packs, error, loading, list, count, pagesize } = mobilepagelist;
    const thispage = parseInt(page) || 1;
    const total = Math.ceil(count / pagesize);
    let typeCode ;
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
      <VerticalLayout width="100%" background="#f5f5f5" minHeight="90vh">
        <HtmlTitle
          title={title}
          description={description}
          keywords={keywords}
        ></HtmlTitle>
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
          <HorizontalLayout alignItems="center" justify="space-between" width="100%" padding="10px 16px" background="#fff">
            <HorizontalLayout color="#3E82F7" fontSize="13px" onClick={() => { this.setState({ showFilter: false }); }} >
              <Mpicker keyword={keyword} nowType={type} {...this.props}></Mpicker>
            </HorizontalLayout>
            { parseInt(type) !== 1 && <HorizontalLayout color="rgba(74,74,74,1)" fontSize="13px" onClick={() => { this.setState({ showFilter: !this.state.showFilter }); }}>
              { !space && !style && !site && '筛选' }{ space ? `${space}/` : '' }{ style ? `${style}/` : '' }{ site || '' }
            </HorizontalLayout> }
          </HorizontalLayout>
        </ListTop>
        <VerticalLayout width="100%" height="91px" background="#fff"></VerticalLayout>
        { loading && <HorizontalLayout margin="20px auto" fontSize="15px" alignItems="center" justify="center">{'加载中...'}</HorizontalLayout> }
        { error && <HorizontalLayout margin="20px auto" fontSize="15px" alignItems="center" justify="center">{'加载出错...稍后重试哦！'}</HorizontalLayout> }
        { !loading && (!packs || packs.length === 0) && <HorizontalLayout margin="20px auto" fontSize="13px" alignItems="center" justify="center">
          {keyword ? `找不到关键字为${keyword}的图片，换一个搜索条件试试？` : '暂无数据'}</HorizontalLayout>}
        { !loading &&
        <HorizontalLayout width="100%" flexWrap="wrap" justify="flex-start" alignItems="flex-start">
          { !this.state.showFilter && packs && packs.length > 0 && (packs || []).map((item, index) =>
// eslint-disable-next-line no-underscore-dangle
            (<MproductItem key={index} to={parseInt(item.type) === 1 ? `/mobile/productpage?id=${item._id}&productid=${item.products[0]._id}` : `/mobile/productpage?id=${item._id}`}>
              <MproductItemimg>
                <Image src={item.cover || item.images[0]} alt={item.title} width="100%" maxWidth="300px" />
              </MproductItemimg>
              { parseInt(item.type) === 1 &&
              <VerticalLayout width="100%" padding="10px">
                <ProdcutNo>{ item.products[0].no || '' }</ProdcutNo>
                <ProdcutSer>标签：
                  <Tags>
                    { item.tag.length > 0 ? (item.tag.map((item, index) => <Tagsitem key={index}>{item.name}</Tagsitem>)) : '暂无数据'}
                  </Tags>
                </ProdcutSer>
              </VerticalLayout>}
            </MproductItem>)
          )}
        </HorizontalLayout>}
        { total > 0 &&
        <HorizontalLayoutPag width="100%" >
          <Pagination
            total={total}
            className="custom-pagination-with-icon"
            current={thispage}
            locale={{
              prevText: (<span className="arrow-align">上一页</span>),
              nextText: (<span className="arrow-align">下一页</span>),
            }}
            onChange={(e) => { this.props.dispatch(changepage(e)); }}
          />
        </HorizontalLayoutPag> }

        { this.state.showFilter && <Mark onClick={() => { this.setState({ showFilter: !this.state.showFilter }); }}>
          <VerticalLayout width="100%" background="#ffffff" justify="flex-start" padding="10px 16px 100px 16px">
            <Filtrate
              changeType={this.onSelectType}
              changeSpace={(value) => dispatch(changeUrlParam('space', value))}
              changeStyle={(value) => dispatch(changeUrlParam('style', value))}
              changeSite={(value) => dispatch(changeUrlParam('site', value))}
              currentStyle={style}
              currentSpace={space}
              currentSite={site}
              // hasLogin={!!appData.ttoken}
              type={type}
            />
          </VerticalLayout>
          <FiltrateBtn>
            <HorizontalLayout flex="1" height="44px" alignItems="center" justify="center" fontSize="15px" color="#ffffff" margin="0 1px 0 0" background="#3F83F8">完成</HorizontalLayout>
            <HorizontalLayout
              flex="1"
              height="44px"
              alignItems="center"
              justify="center"
              fontSize="15px"
              color="#ffffff"
              margin="0"
              background="#3F83F8"
              onClick={() => {
                dispatch(changeUrlParam('space', '')); dispatch(changeUrlParam('style', '')); dispatch(changeUrlParam('site', ''));
              }}
            >重置</HorizontalLayout>
          </FiltrateBtn>
        </Mark> }
        <HorizontalLayout width="100%" height="50px" background="#f5f5f5"></HorizontalLayout>
      </VerticalLayout>
    );
  }
}

MobilePageList.propTypes = {
  dispatch: PropTypes.func,
  mobilepagelist: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  mobilepagelist: makeSelectMobilePageList(),
  space: makeSelectUrlParam('space'),
  style: makeSelectUrlParam('style'),
  site: makeSelectUrlParam('site'),
  page: makeSelectUrlParam('page'),
  type2: makeSelectUrlParam('type'),
  keyword: makeSelectUrlParam('keyword'),
  type: makeSelectType(),
  ttoken: makeSelectTToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mobilePageList', reducer });
const withSaga = injectSaga({ key: 'mobilePageList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MobilePageList);
