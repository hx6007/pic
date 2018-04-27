/**
 *
 * ArticlePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { Icon, NavBar } from 'antd-mobile';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectArticlePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import HtmlTitle from '../../components/HtmlTitle';
import Image from '../../components/Image';
import Group from './group.png';
import Fullview from './fullview.png';
import FullviewB from './fullviewblack.png';
import Share from './share.png';
import ShareB from './shareB.png';
import Vido from './vido.png';
import VidoB from './vidoblack.png';
import Hide from './hideimg.png';
import last from '../../containers/MuserPage/Rectangle44@2x.png';
import { makeSelectUrlParam } from '../App/selectors';

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const ItemImg = styled(VerticalLayout)`
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  img{
  margin-bottom: 10px;
    width: 100%;
  }
`;
const ArticleDetail = styled(VerticalLayout)`
  position: absolute;
  top: 230px;
  left: 0;
`;
const ProductList = styled(HorizontalLayout)`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 20px;
  border-top: 1px solid #f5f5f5;
  background: #ffffff;
`;
const Torelation = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
const ShowimgBytn = styled(VerticalLayout)`
  position: fixed;
  bottom: 60px;
  right: 0;
`;
const HorizontalLayoutHtml = styled(HorizontalLayout)`
  overflow: hidden;
`;
export class ArticlePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    showImg: false,
    copied: false,
  };
  createMarkup = (html) => ({ __html: html });
  MyComponent = (html) => <div dangerouslySetInnerHTML={this.createMarkup(html)} />;
  getquery = (id) => gql`{
    article(id: "${id}") {
      title
      displayMode
      describe
      images
      html
      video
      vr
      packs {
        id:_id
        products{
          id:_id
          no
          series
          brand
          spec
          image
        }
      }
  }
}`;
  render() {
    const { id } = this.props;
    return (
      <Query query={this.getquery(id)}>
        { ({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          const { article } = data;
          const { title, describe, video, vr, images, packs = [], html } = article;
          return (
            <VerticalLayout width="100%" background="#ffffff" minHeight="100vh" >
              <VerticalLayoutTop width="100%" background="#F5F5F5" color="#000">
                <HtmlTitle
                  title={'万图专题'}
                  description={'万图专题'}
                  keywords={'万图专题'}
                ></HtmlTitle>
                <NavBar
                  mode="light"
                  icon={<Icon type="left" color="#000" />}
                  onLeftClick={() => {
                    this.props.history.goBack();
                  }}
                >{'万图专题详情'}</NavBar>
              </VerticalLayoutTop>
              <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
              <VerticalLayout width={'100%'}>
                <ItemImg height={this.state.showImg ? 'auto' : '250px'}>
                  {(images).map((item, index) => (
                    <Image key={index} src={item} width="100%" maxWidth="750px"></Image>
                  ))}
                  <HorizontalLayout width={'100%'} height={'45px'}></HorizontalLayout>
                </ItemImg>
              </VerticalLayout>
              { !this.state.showImg && <HorizontalLayout>
                <ArticleDetail width={'100%'} height={'auto'} background={'#ffffff'} >
                  <HorizontalLayout width="100%" padding="10px 0" alignItems="center" justify="center" onClick={() => { this.setState({ showImg: true }); }} >
                    <img src={Group} alt="" />
                  </HorizontalLayout>
                  <VerticalLayout width="100%" alignItems="center" >
                    <HorizontalLayout fontSize="18px" color={'black'} margin={'10px 20px 0 20px'} >{ title }</HorizontalLayout>
                    <HorizontalLayout fontSize="12px" color={'rgba(155,155,155,1)'} margin={'10px 20px '}>{ describe }</HorizontalLayout>
                  </VerticalLayout>
                  <HorizontalLayout width="100%" margin={'20px 0'} alignItems="center" justify="center">
                    <HorizontalLayout style={{ position: 'relative' }} width={'45px'} height={'45px'} alignItems="center" justify="center" border={'1px solid #E2E2E2'} radius={'50%'}>
                      <img src={Share} alt="" />
                      <CopyToClipboard
                        text={`http://www.51etuku.com/mobile/articlepage?id=${id}`}
                        onCopy={() => { message.success('复制地址成功！'); this.setState({ copied: true }); }}
                      >
                        <span style={{ display: 'block', width: '100%', height: '100%', position: 'absolute' }}></span>
                      </CopyToClipboard>
                    </HorizontalLayout>
                    <HorizontalLayout width={'45px'} height={'45px'} margin={'0 35px'} alignItems="center" justify="center" border={'1px solid #E2E2E2'} radius={'50%'}>
                      {video ? <a href={video}><img src={Vido} alt="" /></a> : <img src={VidoB} alt="" /> }
                    </HorizontalLayout>
                    <HorizontalLayout width={'45px'} height={'45px'} alignItems="center" justify="center" border={'1px solid #E2E2E2'} radius={'50%'}>
                      { vr ? <a href={vr}><img src={Fullview} alt="" /></a> : <img src={FullviewB} alt="" /> }
                    </HorizontalLayout>
                  </HorizontalLayout>
                  <HorizontalLayoutHtml width={'100%'} padding={'20px 20px 65px 20px'} borderTop={'10px solid #f5f5f5'}>
                    {this.MyComponent(html)}
                  </HorizontalLayoutHtml>
                </ArticleDetail> </HorizontalLayout>}
              { !this.state.showImg && packs.length > 0 && <ProductList width="100%" padding="10px 0" alignItems="center" justify="center" >
                <Torelation to={`/mobile/articlerelation?id=${id}`}>
                  <HorizontalLayout fontSize={'13px'} color={'#3E82F7'} >产品清单</HorizontalLayout>
                  <img src={last} alt="" width={'24px'} height={'24px'} />
                </Torelation>
              </ProductList> }
              { this.state.showImg && <ProductList width="100%" padding="10px 0" alignItems="center" justify="center" onClick={() => { this.setState({ showImg: false }); }}>
                <img src={Hide} alt="" width={'24px'} height={'24px'} />
              </ProductList> }
              { this.state.showImg && <ShowimgBytn width={'65px'} padding={'10px'}>
                <HorizontalLayout style={{ position: 'relative' }} width={'45px'} margin={'0 0 10px 0'} height={'45px'} alignItems="center" justify="center" background={'rgba(0,0,0,.4)'} radius={'50%'}>
                  <img src={ShareB} alt="" />
                  <CopyToClipboard
                    text={`http://www.51etuku.com/mobile/articlepage?id=${id}`}
                    onCopy={() => { message.success('复制地址成功！'); this.setState({ copied: true }); }}
                  >
                    <span style={{ display: 'block', width: '100%', height: '100%', position: 'absolute' }}></span>
                  </CopyToClipboard>
                </HorizontalLayout>
                { video && <HorizontalLayout width={'45px'} margin={'0 0 10px 0'} height={'45px'} alignItems="center" justify="center" background={'rgba(0,0,0,.4)'} radius={'50%'}>
                  <a href={video}><img src={VidoB} alt="" /></a>
                </HorizontalLayout> }
                { vr && <HorizontalLayout width={'45px'} margin={'0 0 10px 0'} height={'45px'} alignItems="center" justify="center" background={'rgba(0,0,0,.4)'} radius={'50%'}>
                  <a href={vr}><img src={FullviewB} alt="" /></a>
                </HorizontalLayout> }
              </ShowimgBytn> }
            </VerticalLayout>
          );
        }}
      </Query>
    );
  }
}

ArticlePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  articlepage: makeSelectArticlePage(),
  id: makeSelectUrlParam('id'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'articlePage', reducer });
const withSaga = injectSaga({ key: 'articlePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ArticlePage);
