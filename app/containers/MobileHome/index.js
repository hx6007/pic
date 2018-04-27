/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/**
 *
 * MobileHome
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectMobileHome from './selectors';
import reducer from './reducer';
import saga from './saga';
import Swiper from '../../components/Swiper/index';
import HomeT from './tag@2x.png';
import HomeP from './HomeProduct.png';
import HomeW from './HomeWhole.png';
import HomeE from './HomeEffect.png';
import Close from './close@2x.png';
import Gosearch from './searchindex.png';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout/index';
import Logo from '../../components/Logo/index';
import { setGet } from './actions';
import Article from '../../components/Article';

const SwiBox = styled(HorizontalLayout)`
  position: relative;
  width: 100%;
  overflow: hidden;
`;
const LogoBox = styled.div`
  position: absolute;
  top: 109px;
  left: 15px;
  width: 90px;
   @media (max-width: 320px) {
    top: 80px;
   }
`;
const SearchBox = styled(HorizontalLayout)`
  position:relative;
  width: 90%;
  height: 60px;
  padding: 15px;
  margin: 0 auto;
  margin-top:-30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .25);
  border-radius: 4px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  input{
    flex: 1;
    min-width: 80%;
    max-width: 96%;
    font-size:18px;
    color:rgba(191,191,191,1);
    line-height:25px;
    outline: none;
    border: none;
  }
  
`;
const SearchI = styled.span`
  width:20px;
  height:20px;
  margin-left:10px;
  font-size:0px;
  line-height: 20px;
  img{
    width:20px;
    height:20px;
  }
`;
const SearchII = styled(SearchI)`
  margin: 0;
`;
const HomBtn = styled.div`
  width: 28px;
  height: 28px;
  margin-bottom: 6px;
  font-size: 0;
  img{
    width: 28px;
    height: 28px;
  }
`;
const Text = styled.p`
  font-size:13px;
  color:rgba(0,0,0,1);
  line-height:20px;
  text-align: center;
  margin: 0;
`;
const Line = styled.div`
  width: 2px;
  height: 20px;
  margin: 0 8px;
  background: #f4f4f4;
`;
const SearchBarList = styled.div`
  position:absolute;
  top:60px;
  width:100%;
  left:0;
  z-index:10001;
  background:#ffffff;
  border-radius:0 0 5px 5px;
  box-shadow:0 1px 3px #888888;
  max-height: 150px;
  overflow-y: scroll;
`;
const BtnA = styled(Link)`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
const SearchItem = styled(HorizontalLayout)`
  font-size: 14px;
  color: #000;
  padding: 8px 10px;
  height: 30px;
  background: #fff;
  &:hover{
    background: #ddd;
  }
`;
const query = gql`
  query articleAnd($keyword: String,$limit: Int!,$skip: Int!) {
    articleList(keyword: $keyword,limit: $limit, skip: $skip) {
      list{
        title
        describe
        video
        vr
        displayMode
        recorder
        id:_id
        images
      }
    }
  }
`;

export class MobileHome extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    keyword: '', // 搜索框的值
    showSearchList: false, // 控制搜索后的列表展示
  };
  // 搜索框的值改变
  changeVal(keyword) {
    this.setState({ showSearchList: true, keyword });
    const { dispatch } = this.props;
    dispatch(setGet(keyword));
  }
  clearKey() {
    this.setState({ showSearchList: false, keyword: '' });
  }
  searchThis(item) {
    const { history } = this.props;
    if (item) {
      return history.push(`/mobile/pageList?type=1&keyword=${item}`);
    }
    return history.push(`/mobile/pageList?type=1&keyword=${this.state.keyword}`);
  }
  showBtn() {}
  render() {
    const { mobileHome } = this.props;
    const { list } = mobileHome;
    return (
      <VerticalLayout width="100%">
        <SwiBox>
          <Swiper></Swiper>
          <LogoBox>
            <Logo width="90px" />
          </LogoBox>
        </SwiBox>
        <SearchBox>
          <input type="text" placeholder="请输入产品编号/产品系列" value={this.state.keyword} onChange={(e) => { this.changeVal(e.target.value); }} onFocus={() => { this.showBtn(); }} />
          { this.state.showSearchList ? <SearchII onClick={() => { this.clearKey(); }}><img src={Close} alt="" /></SearchII> : ''}
          { this.state.showSearchList ? <Line></Line> : ''}
          <SearchII onClick={() => { this.searchThis(); }}><img src={Gosearch} alt="" /></SearchII>
          {this.state.showSearchList ? <SearchBarList>
            {(list || []).map((item, index) =>
              <SearchItem key={index} onClick={() => { this.setState({ keyword: item }); this.searchThis(item); }}>{item}</SearchItem>
              )}
          </SearchBarList> : ''}
        </SearchBox>
        <HorizontalLayout width="100%" height={'54px'} flexWrap="wrap" margin="25px auto ">
          <VerticalLayout flex="1" height={'54px'} alignItems="center" justify="center" width="50%" >
            <BtnA to="/mobile/pageList?type=1">
              <HomBtn>
                <img src={HomeP} alt="" />
              </HomBtn>
              <Text>产品图</Text>
            </BtnA>
          </VerticalLayout>
          <VerticalLayout flex="1" height={'54px'} alignItems="center" justify="center" width="50%" >
            <BtnA to="/mobile/pageList?type=3">
              <HomBtn>
                <img src={HomeE} alt="" />
              </HomBtn>
              <Text>效果图</Text>
            </BtnA>
          </VerticalLayout>
          <VerticalLayout flex="1" height={'54px'} alignItems="center" justify="center" width="50%" >
            <BtnA to="/mobile/pageList?type=9">
              <HomBtn>
                <img src={HomeW} alt="" />
              </HomBtn>
              <Text>整屋图</Text>
            </BtnA>
          </VerticalLayout>
          <VerticalLayout flex="1" height={'54px'} alignItems="center" justify="center" width="50%" >
            <BtnA to="/mobile/tags">
              <HomBtn>
                <img src={HomeT} alt="" />
              </HomBtn>
              <Text>标签库</Text>
            </BtnA>
          </VerticalLayout>
        </HorizontalLayout>
        <Query query={query} variables={{ keyword: '', limit: 3, skip: 0 }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { articleList } = data;
            const { list } = articleList;
              // console.log("HomearticleList",articleList);
            return (
              <VerticalLayout width="100%">
                {list.map((item, index) => (
                  <Article key={index} describe={item.describe} images={item.images} displayMode={item.displayMode} title={item.title} id={item.id} />
                  ))}
              </VerticalLayout>);
          }}
        </Query>
        <HorizontalLayout width="100%" height="50px" background="#fff"></HorizontalLayout>
      </VerticalLayout>
    );
  }
}

MobileHome.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mobileHome: makeSelectMobileHome(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mobileHome', reducer });
const withSaga = injectSaga({ key: 'mobileHome', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MobileHome);
