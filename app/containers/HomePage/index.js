/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AutoComplete } from 'antd';
import { createStructuredSelector } from 'reselect';
import Logo from '../../components/Logo';
import { VerticalLayout, HorizontalLayout, FlexBody, Layout } from '../../components/Layout';
import PageFooter from '../../components/PageFooter';
import { loadSearch } from './actions';
import reducer from './reducer';
import saga from './saga';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import Type1 from './type1.png';
import Type2 from './type2.png';
import Type9 from './type9.png';
import Type3 from './type3.png';
import Type1a from './type1-a.png';
import Type2a from './type2-a.png';
import Type9a from './type9-a.png';
import Type3a from './type3-a.png';
import makeSelectHomePage from './selectors';
import HtmlTitle from "../../components/HtmlTitle";

const InputSpan = styled.span`
  display: block;
  line-height: 34px;
  flex: 1;
  max-width: 489px;
  padding: 6px 0px;
  font-size: 14px;
  color: #333;
  outline: none;
  box-shadow:0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  -webkit-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  height:44px; 
  background:rgba(255,255,255,1);
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  .ant-input{
    height: 32px;
    border: none;
  } 
`;

const Button = styled.button`
  width:111px;
  height:46px; 
  background:rgba(62,130,247,1);
  border-radius: 0 3px 3px 0 ; 
  box-shadow:0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);
  cursor: pointer;
`;

const SearchWord = styled.span`
  font-size:16px;
  font-family:MicrosoftYaHei;
  color:rgba(255,255,255,1);
`;

const IconVerticalLayout = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  height: 70px;
  cursor: pointer;
  font-size: 0;
  span{
    width:39px;
    font-size:13px;
    font-family:MicrosoftYaHei;
    color:rgba(126,126,126,1);
  }
  &:hover span{
    color:#3E82F7;
  }
  &:hover .activeType1{
    background-image: url(${Type1a});
  }
  &:hover .activeType2{
    background-image: url(${Type2a});
  }
  &:hover .activeType3{
    background-image: url(${Type3a});
  }
  &:hover .activeType9{
    background-image: url(${Type9a});
  }
`;
const TypeBox = styled(HorizontalLayout)`
  cursor: pointer;
  width: 36px;
  height: 36px;
  background-image: url(${Type1});
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 15px;
  
`;
const TypeBox2 = styled(TypeBox)`
  background-image: url(${Type2});
`;
const TypeBox3 = styled(TypeBox)`
  background-image: url(${Type3});
`;
const TypeBox9 = styled(TypeBox)`
  background-image: url(${Type9});
`;

export class HomePage extends React.PureComponent {

  state={
    keyword: '', // 搜索关键字
  };

  /**
   * 跳至搜索页
   */
  goSearch() {
    const { history } = this.props;
    const { keyword } = this.state;
    let url = '/products?&type=1';
    if (keyword) {
      url += `&keyword=${keyword}`;
    }
    history.push(url);
  }

  render() {
    const { homePage, dispatch } = this.props;
    const { searchList } = homePage;
    const { keyword } = this.state;
    return (
      <Layout background="#FFF" display="block" >
        <HtmlTitle></HtmlTitle>
        <FlexBody >
          <VerticalLayout height="80vh" minHeight="400px" padding="20px 0 10px 0" alignItems="stretch" justify="space-between" >
            <HorizontalLayout justify="flex-end" >
            </HorizontalLayout>
            <VerticalLayout alignItems="stretch" >
              <VerticalLayout alignItems="center">
                <Logo width="197px" />
              </VerticalLayout>
              <VerticalLayout alignItems="stretch" >
                <HorizontalLayout margin="30px 0 0 0" justify="center">
                  <InputSpan >
                    <AutoComplete
                      allowClear
                      style={{ width: '100%' }}
                      placeholder="搜索产品编号、产品系列"
                      dataSource={searchList}
                      value={keyword}
                      autoFocus={false}
                      onSearch={(value) => {
                        this.setState({ keyword: value });
                        dispatch(loadSearch(value));
                      }}
                      onSelect={(value) => {
                        dispatch(push(`/products?keyword=${value}`));
                      }}
                    />
                  </InputSpan>
                  <Button type="primary" onClick={() => this.goSearch()}>
                    <SearchWord>搜索</SearchWord>
                  </Button>
                </HorizontalLayout>
              </VerticalLayout>
              <HorizontalLayout width="600px" height="70px" margin="60px auto">
                <IconVerticalLayout to={'/products?type=1'} >
                  <TypeBox className={'activeType1'}>
                  </TypeBox>
                  <span>产品图</span>
                </IconVerticalLayout>
                <IconVerticalLayout to={'/products?type=3'}>
                  <TypeBox3 className={'activeType3'}>
                  </TypeBox3>
                  <span>效果图</span>
                </IconVerticalLayout>
                <IconVerticalLayout to={'/products?type=9,10'}>
                  <TypeBox9 className={'activeType9'}>
                  </TypeBox9>
                  <span>整屋图</span>
                </IconVerticalLayout>
                <IconVerticalLayout to={'/products?type=2'}>
                  <TypeBox2 className={'activeType2'}>
                  </TypeBox2>
                  <span>实景图</span>
                </IconVerticalLayout>
              </HorizontalLayout>
            </VerticalLayout>
            <HorizontalLayout justify="flex-end" >
            </HorizontalLayout>
            {/*<PageFooter />*/}
          </VerticalLayout>
        </FlexBody>
      </Layout>
    );
  }

}

HomePage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.any,
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
