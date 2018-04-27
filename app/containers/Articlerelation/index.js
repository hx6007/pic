/**
 *
 * Articlerelation
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon, NavBar } from 'antd-mobile';
import { createStructuredSelector } from 'reselect';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import { makeSelectUrlParam } from '../App/selectors';
import { HorizontalLayout, VerticalLayout } from '../../components/Layout';
import HtmlTitle from '../../components/HtmlTitle';
import Image from '../../components/Image';

const VerticalLayoutTop = styled(VerticalLayout)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .am-navbar{
  width: 100%;
  }
`;
const ToProduct = styled(Link)`
  width: 100%;
`;
const query = gql`
query ($id: ID!){
  article(id: $id) {
    packs{
      id:_id
      cover
      products{
        productId:_id
        brand
        image
        no
        series
        spec
      }
    }
  }
}
`;
export class Articlerelation extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { articleId } = this.props;
    return (
      <VerticalLayout width="100%" background="#ffffff" minHeight="100vh">
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
          >{'产品清单'}</NavBar>
        </VerticalLayoutTop>
        <VerticalLayout width="100%" background="#F5F5F5" height="45px"></VerticalLayout>
        <Query query={query} variables={{ id: articleId }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { article } = data;
            const { packs } = article;
            return (
              <VerticalLayout width={'100%'} padding={'0 20px'} borderTop={'1px solid #f5f5f5'}>
                {packs.map((item, index) => (
                  <ToProduct key={index} to={`/mobile/productpage?id=${item.id}&productid=${item.products[0].productId}`}>
                    <HorizontalLayout width={'100%'} padding={'20px 0'} borderBottom={'1px solid #f5f5f5'}>
                      <Image src={item.cover || item.products[0].image[0]} width="60px" height="60px"></Image>
                      <VerticalLayout alignItems="center" justify="center" margin={'0 0 0 20px'}>
                        <HorizontalLayout width={'100%'} fontSize={'13px'} color={'#3E82F7'} margin={'0 0 10px 0'}>{item.products[0].no} | {item.products[0].series}</HorizontalLayout>
                        <HorizontalLayout width={'100%'} fontSize={'12px'} color={'#777777'}>规格：{item.products[0].spec} | 品牌：{item.products[0].brand}</HorizontalLayout>
                      </VerticalLayout>
                    </HorizontalLayout>
                  </ToProduct>
                  ))}
              </VerticalLayout>
            );
          }}
        </Query>
      </VerticalLayout>
    );
  }
}

Articlerelation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  articleId: makeSelectUrlParam('id'),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(Articlerelation);
