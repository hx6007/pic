/**
 *
 * Mlabelpage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavBar } from 'antd-mobile';
import { message } from 'antd';
import { Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import makeSelectMlabelpage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getTagList } from '../../utils/service';
import Combined from '../../containers/MobilePageList/searchindex.png';
import Close from '../MobileHome/close@2x.png';

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
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
const LabelItem = styled(Link)`
  display: inline-block;
  height: 34px;
  margin: 0 10px 10px 0;
  padding: 0 13px;
  font-size: 13px;
  color: #4A4A4A;
  background: #ffffff;
  border-radius: 2px;
  p{
     line-height: 34px;
    margin: 0;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export class Mlabelpage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    list: [],
  };
  componentDidMount() {
    this.loadList();
  }
  loadList=() => {
    getTagList(0).then((result) => {
      this.setState({ list: result });
    }).catch((error) => {
      message.error('加载错误');
      console.error(error);
    });
  };
  render() {
    const { list } = this.state;
    const labelList = list.map((item, index) => (<LabelItem key={index} to={`/mobile/labelist?id=${item._id}`}><p>{item.name}</p></LabelItem>));
    return (
      <VerticalLayout width="100%" background="#F5F5F5" minHeight="90vh">
        <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
          <NavBar
            mode="light"
          >标签库</NavBar>
        </VerticalLayoutTop>
        <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
        {/*<VerticalLayout width="100%" background="#fff">*/}
          {/*<SearchBox>*/}
            {/*<input type="text" name="" id="" placeholder="搜索标签" value={this.state.keyword || ''} onChange={(e) => { this.changeVal(e.target.value); this.setState({ showFilter: false }); }} />*/}
            {/*{ this.state.keyword &&*/}
            {/*<SearchIcon2 onClick={() => { this.clearKey(); }}><img src={Close} alt="" /></SearchIcon2> }*/}
            {/*<SearchIcon onClick={() => { this.searchThis(); }}><img src={Combined} alt="" /></SearchIcon>*/}
             {/*{this.state.showSearchList ? <SearchBarList>*/}
             {/*{(list || []).map((item, index) =>*/}
             {/*<SearchItem key={index} onClick={() => { this.setState({ keyword: item, showSearchList: false }); this.searchThis(item); }}>{item}</SearchItem>*/}
             {/*)}*/}
             {/*</SearchBarList> : ''}*/}
          {/*</SearchBox>*/}
        {/*</VerticalLayout>*/}
        <HorizontalLayout width="100%" justify="flex-start" flexWrap="wrap" padding="16px">
          {labelList}
        </HorizontalLayout>
        <HorizontalLayout width="100%" height="50px" background="#f5f5f5"></HorizontalLayout>
      </VerticalLayout>
    );
  }
}

Mlabelpage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mlabelpage: makeSelectMlabelpage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'mlabelpage', reducer });
const withSaga = injectSaga({ key: 'mlabelpage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Mlabelpage);
